import { FileStorageLibrary } from "../src/FileStorageLibrary"

describe('FileStorageLibrary:', ()=>{
    let fileStorageLibrary: FileStorageLibrary

    beforeEach(()=>{
        fileStorageLibrary = new FileStorageLibrary();
    })

    it('should save the content into file', async ()=>{
        // Arrange
        const content = 'Content of image...';
        const outputPath = 'sample.jpg';

        // Act + Assert
        await expect(fileStorageLibrary.saveContentIntoFile(outputPath, content)).resolves.not.toThrow();

    });
})