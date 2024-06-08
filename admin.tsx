import { useEffect, useState } from "react";
import { ProductI } from "../../Types/Product.interface";
import productServices from "../../Services/ProductServices";
import SectionWrapper from "../../Components/SectionWrapper";
import { logo } from "../../Components/Shared/Assets/Assets";
import Button from "../../Components/UI/Button";
import { twMerge } from "tailwind-merge";
import ImageToBase64Converter from "../../Components/Image64";

const Admin = () => {
  const [courses, setCourses] = useState<ProductI[]>();
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    productServices.allProducts({ page: 1, pageSize: 100 }).then(({ data }) => {
      setCourses(data.products);
    });
  }, []);

  const handleUpdate = (id: string, image: string) => {
    productServices
      .updateProduct({
        id,
        image,
      })
      .then(({ data }) => {
        setCourses((prev) => [
          ...prev!.map((course) => (course.id === id ? data : course)),
        ]);
        setEditMode(false);
      });
  };

  return (
    <SectionWrapper className="p-5">
      <h1>Admin Panel</h1>
      <div className="flex gap-5 flex-wrap">
        {courses &&
          courses.map((course) => (
            <div
              key={course.id}
              className="relative bg-white group w-64 shadow-md overflow-hidden rounded-xl border"
            >
              {editMode ? (
                <div className="p-5">
                  <ImageToBase64Converter
                    initialBase64String={course.image}
                    handleChange={setImage}
                  />
                </div>
              ) : (
                <div className="h-full p-5">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={
                        course.image === "data:image/png;base64,"
                          ? logo
                          : course.image
                      }
                      alt={course.title}
                    />
                  </div>
                  <div className="flex justify-between items-center w-full my-2">
                    <h2 className="font-bold">{course.title}</h2>
                    <p>{course.price}$</p>
                  </div>
                  <p className="border rounded-md p-1">
                    {course.description.slice(0, 100)}...
                  </p>
                </div>
              )}
              <div
                className={twMerge(
                  "p-2 -bottom-16 transition-all group-hover:bottom-0 bg-slate-500 w-full flex gap-2 justify-end",
                  !editMode && "absolute"
                )}
              >
                {editMode ? (
                  <>
                    <Button btnType="danger">Delete</Button>
                    <Button onClick={() => handleUpdate(course.id, image)}>
                      Update
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setEditMode(true)}>edit</Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </SectionWrapper>
  );
};

export default Admin;
