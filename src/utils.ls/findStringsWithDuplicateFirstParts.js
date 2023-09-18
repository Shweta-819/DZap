function findStringsWithDuplicateFirstParts(arr) {
    const firstPartMap = new Map();
    const duplicates = [];

    for (let index = 0; index < arr.length; index++) {
    const str = arr[index];
    const parts = str.split(' ');
    if (parts.length === 2) {
        const firstPart = parts[0];

        if (firstPartMap.has(firstPart)) {
        duplicates.push({ str, lineNumbers: [firstPartMap.get(firstPart), index + 1] });
        } else {
          firstPartMap.set(firstPart, index + 1); 
        }
    }
    }

    return duplicates;
}

export default findStringsWithDuplicateFirstParts;