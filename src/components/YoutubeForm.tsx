import { Resolver, useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type FormDataType = {
  username: string,
  email: string,
  channel: string,
  gender: string,
  hobbies: string[],
  city: string,
  towns: string[],
  image: File | null,
}
const FileSchema = Yup.mixed<File>()
  .test(
    "fileType",
    "Only jpg and png files are allowed",
    (value): value is File =>
      value instanceof File && ["image/jpeg", "image/png"].includes(value.type)
  )
  .test(
    "fileSize",
    "File size is too large",
    (value): value is File =>
      value instanceof File && value.size <= 2 * 1024 * 1024 // 2MB
  )
  .required("Image is required");


const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  channel: Yup.string().required("Channel is required"),
  gender: Yup.string().required("Gender is required"),
  hobbies: Yup.array()
    .of(Yup.string().required())
    .min(1, "Please select at least one hobby")
    .required(),
  city: Yup.string().required("City is required"),
  towns: Yup.array()
    .of(Yup.string().required())
    .min(1, "Please select at least one town")
    .required(),
  image: FileSchema,
});






function YoutubeForm() {

  const form = useForm<FormDataType>({
    resolver: yupResolver(schema) as Resolver<FormDataType>,
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      gender: "",
      hobbies: [],
      city: "",
      towns: [],
      image: null,

    },
  })



  const { register, control, formState, handleSubmit, setValue } = form
  const { errors } = formState

  const onSubmit = (data: FormDataType) => {
    console.log(data)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    const file = e.target.files?.[0] || null;
    setValue("image", file); // Update the file in the form state
  };

  return (
    <div onSubmit={handleSubmit(onSubmit)} className=" w-[400px] mx-auto bg-gray-100 p-5">
      <form className="flex flex-col gap-5 mt-5">
        <h2 className="text-2xl">Signup Form</h2>
        <div>
          add image upload with yup schema validation for jpg and png
        </div>
        <div>
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" {...register("username")} />
          {errors.username && <div className='error'>{errors.username?.message}</div>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register('email')} />
          {errors.email && <div className='error'>{errors.email?.message}</div>}
        </div>
        <div>
          <label htmlFor="channel">Channel Name</label>
          <input type="text" id="channel" {...register('channel')} />
          {errors.channel && <div className='error'>{errors.channel?.message}</div>}
        </div>

        <div>
          <h3 className='text-lg'>Gender</h3>

          <div className='flex gap-2'>
            <input type="radio" id='male' {...register('gender')} value="male" />
            <label htmlFor="male">Male</label>
          </div>
          <div className='flex gap-2'>
            <input type="radio" id='female' {...register('gender')} value="female" />
            <label htmlFor="female">FeMale</label>
          </div>
          {errors.gender && <div className='error'>{errors.gender?.message}</div>}
        </div>
        <div>
          <h3 className='text-lg'>Hobbies</h3>
          <div className='flex gap-2'>

            <input type="checkbox" id='music' {...register('hobbies')} value="music" />
            <label htmlFor="music">music</label>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='sports' {...register('hobbies')} value="sports" />
            <label htmlFor="sports">sports</label>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='reading' {...register('hobbies')} value="reading" />
            <label htmlFor="reading">reading</label>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='running' {...register('hobbies')} value="running" />
            <label htmlFor="running">running</label>
          </div>
          {errors.hobbies && <div className='error'>{errors.hobbies?.message}</div>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="city">City</label>
          <select id="city" {...register('city')}>
            <option value="">-Select-</option>
            <option value="islamabad">Islamabad</option>
            <option value="lahore">Lahore</option>
            <option value="karachi">Karachi</option>
          </select>
          {errors.city && <div className='error'>{errors.city?.message}</div>}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="towns">Towns</label>
          <select id="towns" {...register('towns')} multiple>
            <option value="">-Select-</option>
            <option value="G10">G-10</option>
            <option value="G9">G-9</option>
            <option value="G11">G11</option>
            <option value="F10">F-10</option>
          </select>
          {errors.towns && <div className='error'>{errors.towns?.message}</div>}
        </div>

        <div>
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" onChange={handleFileChange} // Use custom onChange handler
          />
          {errors.image && <div className='error'>{errors.image?.message}</div>}
        </div>

        <div>
          <button className="blue-button">Save Data</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  )
}

export default YoutubeForm
