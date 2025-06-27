import { useFormik } from "formik";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      qty: "",
    },
    validate: (value) => {
      let error = {};

      if (value.title == "") {
        error.title = "Please enter the title";
      }

      if (parseInt(value.price) < 0 || !value.price) {
        error.price = "Please enter correct price";
      }

      if (parseInt(value.qty) < 0 || !value.qty) {
        error.qty = "Please enter correct Quantity";
      }

      return error;
    },
    onSubmit: async (value) => {
      if (isEdit) {
        await axios.put(`https://fsd25-nodejs.onrender.com/${currentId}`, value);
        const products = await axios.get("https://fsd25-nodejs.onrender.com/products");
        setProducts(products.data);
        setisEdit(false);
        setCurrentId(null);
        formik.resetForm();
      } else {
        await axios.post("https://fsd25-nodejs.onrender.com/product", value);
        const products = await axios.get("https://fsd25-nodejs.onrender.com/products");
        setProducts(products.data);
        setProducts([...products, value]);
        formik.resetForm();
      }
    },
  });

  let handleEdit = (_id) => {
    console.log(_id);
    let product = products.find((pro) => pro._id === _id);
    if (product) {
      formik.setValues({
        title: product.title,
        price: product.price,
        qty: product.qty,
      });
      setisEdit(true);
      setCurrentId(_id);
    }
  };

  let handleFetch = async () => {
    try {
      const products = await axios.get("https://fsd25-nodejs.onrender.com/products");
      setProducts(products.data);
    } catch (error) {
      alert(error);
    }
  };

  let handleDelete = async (_id) => {
    try {
      await axios.delete(`https://fsd25-nodejs.onrender.com/product/${_id}`);
      const products = await axios.get("https://fsd25-nodejs.onrender.com/products");
      setProducts(products.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <div className="flex mx-auto">
      <div className="w-1/2 p-5">
        <h1 className="text-2xl">Add Product</h1>

        <form class="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <span className="text-red-500">
              {formik.touched.title &&
                formik.errors.title &&
                formik.errors.title}
            </span>
          </div>

          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium">
              Product Price
            </label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <span className="text-red-500">
              {formik.touched.price &&
                formik.errors.price &&
                formik.errors.price}
            </span>
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium">
              Quantity Avilable
            </label>
            <input
              type="number"
              name="qty"
              value={formik.values.qty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <span className="text-red-500">
              {formik.touched.qty && formik.errors.qty && formik.errors.qty}
            </span>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-1/2">
        <div class="relative overflow-x-auto">
          <h1 className="text-2xl">Items</h1>
          <table class="w-full text-sm text-left rtl:text-right  ">
            <thead class="text-xs  uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr class="bg-white border-b text-black">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium  whitespace-nowrap"
                    >
                      {product.title}
                    </th>
                    <td class="px-6 py-4">{product.price}</td>
                    <td class="px-6 py-4">{product.qty}</td>
                    <td class="px-6 py-4">
                      <button
                        className="cursor-pointer hover:text-gray-400"
                        onClick={() => {
                          handleEdit(product._id);
                        }}
                      >
                        Edit
                      </button>{" "}
                      |{" "}
                      <button
                        onClick={() => {
                          handleDelete(product._id);
                        }}
                        className="cursor-pointer hover:text-gray-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
