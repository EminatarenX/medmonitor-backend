export interface IUploader { 
    save (image: Express.Multer.File, key: string): Promise<void>
    getSignedUrl (key: string): Promise<string>
    delete( key : string) : Promise<void>
}