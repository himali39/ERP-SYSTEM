// const onSubmit = (data) => {
//   const existingData = JSON.parse(localStorage.getItem("data")) || [];

//   // Include the image data in the newData array
//   const newData = [...existingData, { ...data, myfile: imagePreview }];

//   localStorage.setItem("data", JSON.stringify(newData));

//   setImagePreview(null);
//   window.location.href = "/faculty";
//   console.log(data);
// };


  //   const onSubmit = async (data) => {
  //     try {
  //       const response = addFacultyMutation.mutate({
  //         // myfile: imagePreview,
  //         facultyName: data.facultyName,
  //         facultySubject: data.facultySubject,
  //         facultyAddress: data.facultyAddress,
  //       });
  //       console.log("addFacultyMutation", addFacultyMutation);

  //       // setImagePreview(null);
  //       console.log("Data saved successfully to MongoDB", response);
  // api.invalidateTags("Faculty");

  //       // getUpdatedFaculty.refetchQueries(["getFacultyList"]);
  //       window.location.href = "/faculty";

  //     } catch (error) {
  //       console.error("Error saving data to MongoDB", error);
  //     }
  //   };