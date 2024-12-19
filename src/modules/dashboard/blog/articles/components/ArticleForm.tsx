import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormComponent from "@/components/form-component/FormComponent"
import { TFormField } from "@/types/form.types"
import articleFormSchema from "../schemas/article.schema"
import { Image } from "@/types/global.types"
import { toast } from "sonner"
import DisplayData from "@/utils/DisplayData"

const dynamicFields: TFormField[] = [
  {
    name: "title",
    label: "Blog Title",
    type: "text",
    className: "col-span-12 md:col-span-6",
    required: true,
  },
  {
    name: "country",
    label: "Country",
    type: "combobox",
    className: "col-span-12 md:col-span-6",
    required: true,
    custom: {
      placeholder: "Select Custom Country",
      searchPlaceholder: "Search Custom Country...",
      options: [
        { value: "india", label: "India" },
        { value: "usa", label: "USA" },
        { value: "uk", label: "UK" },
        { value: "canada", label: "Canada" },
        { value: "australia", label: "Australia" },
        { value: "germany", label: "Germany" },
        { value: "france", label: "France" },
        { value: "spain", label: "Spain" },
        { value: "italy", label: "Italy" },
        { value: "japan", label: "Japan" },
        { value: "china", label: "China" },
        { value: "russia", label: "Russia" },
        { value: "brazil", label: "Brazil" },
        { value: "mexico", label: "Mexico" },
        { value: "south africa", label: "South Africa" },
        { value: "nigeria", label: "Nigeria" },
        { value: "egypt", label: "Egypt" },
        { value: "kenya", label: "Kenya" },
        { value: "ethiopia", label: "Ethiopia" },
      ],
    },
  },
  {
    name: "city",
    label: "City Name",
    type: "multiSelect",
    className: "col-span-12",
    required: true,
    custom: {
      placeholder: "Select Cities to show blog",
      numberDisplayed: 5,
      options: [
        {
          label: "New York",
          value: "new-york",
        },
        {
          label: "Los Angeles",
          value: "los-angeles",
        },
        {
          label: "Chicago",
          value: "chicago",
        },
        {
          label: "Houston",
          value: "houston",
        },
        {
          label: "Phoenix",
          value: "phoenix",
        },
        {
          label: "Philadelphia",
          value: "philadelphia",
        },
        {
          label: "San Antonio",
          value: "san-antonio",
        },
        {
          label: "San Diego",
          value: "san-diego",
        },
        {
          label: "Dallas",
          value: "dallas",
        },
        {
          label: "San Jose",
          value: "san-jose",
        },
        {
          label: "Austin",
          value: "austin",
        },
        {
          label: "Jacksonville",
          value: "jacksonville",
        },
        {
          label: "Fort Worth",
          value: "fort-worth",
        },
        {
          label: "Columbus",
          value: "columbus",
        },
        {
          label: "Charlotte",
          value: "charlotte",
        },
        {
          label: "San Francisco",
          value: "san-francisco",
        },
        {
          label: "Indianapolis",
          value: "indianapolis",
        },
        {
          label: "Seattle",
          value: "seattle",
        },
        {
          label: "Denver",
          value: "denver",
        },
        {
          label: "Washington",
          value: "washington",
        },
        {
          label: "Boston",
          value: "boston",
        },
        {
          label: "El Paso",
          value: "el-paso",
        },
        {
          label: "Nashville",
          value: "nashville",
        },
        {
          label: "Detroit",
          value: "detroit",
        },
        {
          label: "Oklahoma City",
          value: "oklahoma-city",
        },
        {
          label: "Portland",
          value: "portland",
        },
        {
          label: "Las Vegas",
          value: "las-vegas",
        },
        {
          label: "Memphis",
          value: "memphis",
        },
      ],
    },
  },
  {
    name: "text",
    label: "Blog Description",
    type: "textEditor",
    className: "col-span-12",
    required: true,
    custom: {
      inputClassName: "h-[300px]",
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    className: "col-span-12 md:col-span-6",
    required: true,
  },
  {
    name: "category",
    label: "Blog Category",
    type: "select",
    className: "col-span-12 md:col-span-6",
    required: true,
    custom: {
      placeholder: "Select Blog Category",
      options: [
        { value: "tech", label: "Tech" },
        { value: "lifestyle", label: "Lifestyle" },
        { value: "news", label: "News" },
        { value: "sports", label: "Sports" },
        { value: "entertainment", label: "Entertainment" },
      ],
    },
  },
  {
    name: "image",
    label: "Blog Image",
    type: "image",
    className: "col-span-12",
    required: true,
    custom: {
      isMulti: true,
      placeholder: "Upload Blog Image",
    },
  },
  {
    name: "acceptTerms",
    label: "Accept Terms & Conditions",
    type: "checkbox",
    className: "col-span-12 md:col-span-6",
  },
]

type TArticleForm = {
  title: string
  text: any
  password: string
  category: string
  image: Image
  acceptTerms: boolean
  country: string
  city: string[]
}

const ArticleForm = ({ ARTICLE_DATA }: { ARTICLE_DATA?: TArticleForm }) => {
  const blogForm = useForm<z.infer<typeof articleFormSchema>>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: ARTICLE_DATA?.title || "",
      text: ARTICLE_DATA?.text || "",
      password: ARTICLE_DATA?.password || "",
      category: ARTICLE_DATA?.category || "",
      image: ARTICLE_DATA?.image ? [ARTICLE_DATA.image] : [],
      acceptTerms: ARTICLE_DATA?.acceptTerms || false,
      country: ARTICLE_DATA?.country || "",
      city: ARTICLE_DATA?.city || [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  const onSubmit = async (data: z.infer<typeof articleFormSchema>) => {
    console.log(data)
    DisplayData({ data })
  }

  return (
    <>
      <FormComponent
        fields={dynamicFields}
        handleSubmit={onSubmit}
        formData={blogForm}
        buttonClassName='ml-auto'
        buttonText={ARTICLE_DATA ? "Edit Article" : "Create Article"}
        formTitle={ARTICLE_DATA ? "Edit Article" : "Create Article"}
        // fullHeight
      />
    </>
  )
}

export default ArticleForm
