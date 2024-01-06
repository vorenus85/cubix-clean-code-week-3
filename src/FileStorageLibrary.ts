export class FileStorageLibrary {
    public async saveContentIntoFile(outputPath: string, content: string) : Promise<void> {

        const saveContentIntoFilePromise = new Promise( (resolve) => {
            setTimeout(resolve, 500);
        });

        saveContentIntoFilePromise
        .then(()=>{})
        .catch((error)=>{
            throw new Error(error);
        })
        
    }
}