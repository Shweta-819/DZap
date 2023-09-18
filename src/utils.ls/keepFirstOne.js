function keepFirstOne(inputRefs, valuesToDelete) {

    const deleteElement =  valuesToDelete.map((ele)=> (ele.str))
    console.log(deleteElement, 'sssssss')

    console.log(inputRefs, 'initial')
    inputRefs.forEach((ref) => {
      const value = ref.current.value;
      console.log(valuesToDelete, 'valuesToDelete')
    if (deleteElement.includes(value)) {

        ref.current.value = '';  
    }
    });
    console.log(inputRefs, 'mmmmmmmmmmm')
}
export default keepFirstOne;