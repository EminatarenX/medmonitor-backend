#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "MAX30105.h"
#include "heartRate.h"
#include "ESP32Servo.h"
#include <WiFi.h>
#include <PubSubClient.h>

// Configuración del sensor
MAX30105 particleSensor;
#define I2C_SPEED_FAST 400000

const byte RATE_SIZE = 4;
byte rates[RATE_SIZE];
byte rateSpot = 0;
long lastBeat = 0;
float beatsPerMinute;
int beatAvg;

double avered = 0;
double aveir = 0;
double sumirrms = 0;
double sumredrms = 0;

double SpO2 = 0;
double ESpO2 = 90.0;
double FSpO2 = 0.7;
double frate = 0.95;
int i = 0;
int Num = 30;
#define FINGER_ON 7000
#define MINIMUM_SPO2 90.0

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Configuración WiFi y MQTT
const char* ssid = "S21-Emi";
const char* password = "hola12345";
const char* mqtt_server = "18.205.126.177";
const int mqtt_port = 1883;
const char* mqtt_topic = "health/monitor";

WiFiClient espClient;
PubSubClient client(espClient);

void setupWiFi() {
  Serial.println("Conectando a WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado!");
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Conectando a MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Conectado a MQTT!");
    } else {
      Serial.print("Falló, rc=");
      Serial.print(client.state());
      Serial.println(" Reintentando en 5 segundos...");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println("Inicio del sistema");

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.display();
  delay(3000);

  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("No se encontró el MAX30102");
    while (1);
  }

  particleSensor.setup(0x7F, 4, 2, 800, 215, 16384);
  particleSensor.enableDIETEMPRDY();
  particleSensor.setPulseAmplitudeRed(0x0A);
  particleSensor.setPulseAmplitudeGreen(0);

  setupWiFi();
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long irValue = particleSensor.getIR();
  if (irValue > FINGER_ON) {
    if (checkForBeat(irValue) == true) {
      long delta = millis() - lastBeat;
      lastBeat = millis();
      beatsPerMinute = 60 / (delta / 1000.0);
      if (beatsPerMinute < 255 && beatsPerMinute > 20) {
        rates[rateSpot++] = (byte)beatsPerMinute;
        rateSpot %= RATE_SIZE;
        beatAvg = 0;
        for (byte x = 0; x < RATE_SIZE; x++) beatAvg += rates[x];
        beatAvg /= RATE_SIZE;
      }
    }

    uint32_t ir, red;
    double fred, fir;
    particleSensor.check();
    if (particleSensor.available()) {
      i++;
      ir = particleSensor.getFIFOIR();
      red = particleSensor.getFIFORed();

      fir = (double)ir;
      fred = (double)red;
      aveir = aveir * frate + (double)ir * (1.0 - frate);
      avered = avered * frate + (double)red * (1.0 - frate);
      sumirrms += (fir - aveir) * (fir - aveir);
      sumredrms += (fred - avered) * (fred - avered);

      if ((i % Num) == 0) {
        double R = (sqrt(sumirrms) / aveir) / (sqrt(sumredrms) / avered);
        SpO2 = -23.3 * (R - 0.4) + 100;
        ESpO2 = FSpO2 * ESpO2 + (1.0 - FSpO2) * SpO2;
        if (ESpO2 <= MINIMUM_SPO2) ESpO2 = MINIMUM_SPO2;
        if (ESpO2 > 100) ESpO2 = 99.9;
        sumredrms = 0.0;
        sumirrms = 0.0;
        SpO2 = 0;
        i = 0;

        // Publicar datos a MQTT
        String payload = "{\"BPM\":" + String(beatAvg) + ",\"SpO2\":" + String(ESpO2) + "}";
        client.publish(mqtt_topic, payload.c_str());
        Serial.println("Datos enviados a MQTT: " + payload);
      }
      particleSensor.nextSample();
    }
  }
}
