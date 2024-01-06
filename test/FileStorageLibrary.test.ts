import { FileStorageLibrary } from "../src/FileStorageLibrary";

describe('FileStorageLibrary', ()=>{
    let fileStorageLibrary: FileStorageLibrary
    const content = 'Content of image...';
    const outputPath = 'sample.jpg';

    beforeEach(()=>{
        fileStorageLibrary = new FileStorageLibrary();
    });
    describe('Happy path', ()=>{
        it('should save the content into file', async ()=>{
            // Arrange
            const spy = jest.spyOn(fileStorageLibrary, 'saveContentIntoFile');
    
            // Act
            const actualResult = async () => await fileStorageLibrary.saveContentIntoFile(outputPath, content);
    
            // Assert
            await expect(actualResult()).resolves.not.toThrow();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(outputPath, content);
        });
    });
});