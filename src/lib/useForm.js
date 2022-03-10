import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.currentTarget;

    if (type === 'file') {
      [value] = e.currentTarget.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function handleDateChange(date) {
    setInputs({
      ...inputs,
      date
    });
  };

  function handleCategoryAddition(category) {
    setInputs({
      ...inputs,
      categories: [...inputs.categories, category]
    });
  };

  function handleCategoryDeletion(i) {
    setInputs({
      ...inputs,
      categories: inputs.categories.filter((cat, index) => index !== i)
    });
  };

  function handleEditorChange(content) {
    setInputs({
      ...inputs,
      content 
    });
  };

  return {
    inputs,
    handleChange,
    handleDateChange,
    handleCategoryAddition,
    handleCategoryDeletion,
    handleEditorChange,
  }
}