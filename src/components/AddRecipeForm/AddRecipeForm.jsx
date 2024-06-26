import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./yupValidation";
import { FieldsInput } from "./InputFields.styled";
import { useCreateRecipeMutation } from "../../redux/recipes/recipesApi";
import { Form } from "./AddRecipeForm.styled";
import ActiveButton from "components/Buttons/ActiveButton";
import TrashButton from "components/Buttons/TrashButton";
import { RecipeIngredientsContainer } from "components/RecipeIngredients/RecipeIngredients.styled";
import SectionTitle from "components/SectionTitle";
import IngredientSelector from "./IngredientSelected";
import ImageDropZone from "components/ImageDropZone";
import { CategoriesSelector } from "./CategoriesSelector";
import { Counter } from "components/Counter/Counter";

const AddRecipeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    _setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { fields, _append, _remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [_categories, _setCategories] = useState([]);
  const [ingredients, _setIngredients] = useState([]);
  const [_preview, setPreview] = useState(null);

  // const { data } = useGetCategoriesQuery({ limit: 1111 });

  const [createRecipe] = useCreateRecipeMutation();
  // useEffect(() => {
  //   // Отримання категорій з backend
  //   axiosBaseQuery("/api/categories").then(response => {
  //     setCategories(response.data);
  //   });

  //   // Отримання інгредієнтів з backend
  //   axiosBaseQuery("/api/ingredients").then(response => {
  //     setIngredients(response.data);
  //   });
  // }, []);

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === "ingredients") {
          data[key].forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][ingredient]`, ingredient.ingredient);
            formData.append(`ingredients[${index}][amount]`, ingredient.amount);
          });
        } else {
          formData.append(key, data[key]);
        }
      });
      createRecipe(formData);

      // const response = await axiosBaseQuery("/api/recipes", formData);
      // if (response.status === 200) {
      //   // Перенаправлення на сторінку користувача
      //   window.location.href = "/user";
      // }
    } catch (error) {
      alert("Помилка: " + error.message);
    }
  };

  const handleReset = () => {
    reset();
    setPreview(null);
  };

  // const handlePhotoChange = e => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setPreview(URL.createObjectURL(file));
  //     setValue("photo", file);
  //   }
  // };

  const descriptionLength = watch("description")?.length || 0;
  const instructionsLength = watch("instructions")?.length || 0;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ImageDropZone name="image" />

      <FieldsInput>
        <div>
          <label>
            Назва рецепта:
            <input
              type="text"
              {...register("title")}
            />
          </label>
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label>
            Короткий опис:
            <input
              type="text"
              {...register("description")}
            />
            <p>{`Символів: ${descriptionLength}/200`}</p>
          </label>
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <CategoriesSelector
          register={register}
          errors={errors}
        />

        <Counter
          register={register}
          errors={errors}
        />

        <RecipeIngredientsContainer>
          <SectionTitle label={"Ingredients"} />
          <div>
            <IngredientSelector />
          </div>

          {fields.map((field, index) => (
            <div key={field.id}>
              <select {...register(`ingredients.${index}.ingredient`)}>
                {ingredients.map(ingredient => (
                  <option
                    key={ingredient.id}
                    value={ingredient.name}
                  >
                    {ingredient.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                {...register(`ingredients.${index}.amount`)}
              />
            </div>
          ))}
        </RecipeIngredientsContainer>

        <div>
          <label>
            Інструкція:
            <textarea {...register("instructions")}></textarea>
            <p>{`Символів: ${instructionsLength}/200`}</p>
          </label>
          {errors.instructions && <p>{errors.instructions.message}</p>}
        </div>

        <div>
          <TrashButton
            type="button"
            onClick={handleReset}
          ></TrashButton>
          <ActiveButton
            label="Publish"
            type="submit"
          ></ActiveButton>
        </div>
      </FieldsInput>
    </Form>
  );
};

export default AddRecipeForm;
