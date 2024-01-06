export class FileStorageLibrary {
    public async saveContentIntoFile(outputPath: string, content: string) : Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
}