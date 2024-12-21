import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UploadWidget } from "../../components";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/action";

const EditDataPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state.product || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    stock: product.stock,
    imgUrl: product.imgUrl,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProduct(id, formData));
    navigate("/data");
  };

  return (
    <main className="h-screen w-full px-5 pt-5">
      <div className="breadcrumbs text-xl">
        <ul>
          <li>
            <Link to="/data">Master Data</Link>
          </li>
          <li>Edit Data</li>
        </ul>
      </div>
      <div className="bg-[#f7fafc] w-full rounded-md p-5 mt-4">
        <h2 className="text-xl font-bold">Form Edit</h2>
        <form className="form-control" onSubmit={submitHandler}>
          <div className="flex sm:flex-row flex-col my-5">
            <div className="basis-1/4 font-medium pb-3 sm:pb-0">Name</div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              required
            />
          </div>
          <div className="flex sm:flex-row flex-col my-3">
            <div className="basis-1/4 font-medium pb-3 sm:pb-0">
              Description
            </div>
            <textarea
              type="text"
              placeholder="Type here"
              className="textarea-bordered w-full textarea"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
              required
            />
          </div>
          <div className="flex sm:flex-row flex-col my-3">
            <div className="basis-1/4 font-medium pb-3 sm:pb-0">Category</div>
            <select
              className="select select-bordered w-full"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value="Books & Stationery">Books & Stationery</option>
              <option value="Pens & Pencils">Pens & Pencils</option>
              <option value="Paper & Card">Paper & Card</option>
              <option value="Notebooks">Notebooks</option>
              <option value="Calendars">Calendars</option>
              <option value="Office Supplies">Office Supplies</option>
            </select>
          </div>
          <div className="flex sm:flex-row flex-col my-3">
            <div className="basis-1/4 font-medium pb-3 sm:pb-0">Price</div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              value={formData.price}
              required
            />
          </div>
          <div className="flex sm:flex-row flex-col my-3">
            <div className="basis-1/4 font-medium pb-3 sm:pb-0">Stock</div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
              value={formData.stock}
              required
            />
          </div>
          <div className="flex sm:flex-row flex-col my-3">
            <div className="w-1/5 font-medium pb-3 sm:pb-0">Image</div>
            <UploadWidget
              setImageUrl={(public_id) =>
                setFormData({ ...formData, imgUrl: public_id })
              }
              imageId={formData.imgUrl}
            />
          </div>
          <div className="flex justify-end mt-3">
            <Link to="/data">
              <button className="btn btn-error me-3 w-20">Cancel</button>
            </Link>
            <button className="btn btn-primary w-20">Save</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditDataPage;
