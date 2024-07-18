import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import { ReactSortable } from 'react-sortablejs'
import { ThemeContext } from './ThemeContext'
import { useContext } from 'react'

export default function ProductForm({
  _id,
  title:existingTitle,
  description:existingDescription,
  price:existingPrice,
  images:existingImages,
  category:assignedCategory,
  properties:assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [category,setCategory] = useState(assignedCategory || '');
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [price, setPrice] = useState(existingPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {colorTheme} = useContext(ThemeContext);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
      setIsLoading(false);
    })
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,description,price,images,category,properties:productProperties
    };
    if (_id) {
      //update
      await axios.put('/api/products', {...data,_id});
    } else {
      //create
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push('/products');
  }

  async function uploadImages(ev) {
    const files = ev.target?.files
    if (files?.length > 0) {
      setIsUploading(true)
      const data = new FormData()
      for (const file of files) {
        data.append('file', file)
      }
      const res = await axios.post('/api/upload', data)
      setImages(oldImages => {
        return [...oldImages, ...res.data.links]
      })
      setIsUploading(false)
    }
  }

  function updateImageOrder(images) {
    setImages(images)
  }

  function setProductProp(propName,value) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  // 
  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while(catInfo?.parent?._id) {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }
 
  return ( 
    <form onSubmit={saveProduct} className='new-theme-options'>
      <label className='basic'>Product Name</label>
      <input 
        type="text" 
        placeholder='Product Name'
        value={title}
        onChange={ev => setTitle(ev.target.value)} 
        className='text-black'
      />

      <label className='basic'>Category</label>
      <select 
        value={category}
        onChange={ev => setCategory(ev.target.value)}
        id={colorTheme}
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 && categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      {isLoading && (
        <div className='py-2 flex justify-center'>
          <Spinner />
        </div>
      )}
      {propertiesToFill.length > 0 && propertiesToFill.map(p =>(
        <div key={p._id} className="flex gap-1">
          <div>{p.name}:</div>
          <select 
            value={productProperties[p.name]}
            onChange={ev => setProductProp(p.name,ev.target.value)}
          >
            {p.values.map(v => (
              <option key={v._id} value={v}>{v}</option>
            ))}
          </select>
        </div>
      ))}

      <label className='basic'>Photos</label>
      <div className='mb-2 flex flex-wrap gap-1'>
        <ReactSortable 
          list={images} 
          setList={updateImageOrder}
          className='flex flex-wrap gap-1'
        >
          {!!images?.length && images.map(link => (
            <div key={link} className='h-24'>
              <img src={link} alt="posted photo" className='rounded-md' />
            </div>
          ))}
        </ReactSortable>
        {isUploading && (
          <div className='h-24 w-24 bg-gray-200 rounded-md flex flex-col items-center justify-center'>
            <Spinner />
          </div>
        )}
        <label className='w-24 h-24 cursor-pointer bg-gray-200 rounded-md flex flex-col items-center justify-center text-sm text-gray-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
          </svg>
          <div>Upload</div>
          <input id='file-field' type="file" onChange={uploadImages} className='hidden' />
        </label>
      </div>

      <label className='basic'>Product Description</label>
      <textarea 
        placeholder='Product Description'
        value={description}
        onChange={ev => setDescription(ev.target.value)}
        className='text-black'
      >
      </textarea>

      <label className='basic'>Price in (Ksh)</label>
      <input 
        type="number" 
        placeholder='Product Price' 
        value={price}
        onChange={ev => setPrice(ev.target.value)}
        className='text-black'
      />

      <button type='submit' id={colorTheme} className='secondary-button-pages'>Save</button>
    </form>
  )
}