import { TextField } from "@mui/material";

// import debounce from "lodash.debounce";
import { Select } from "antd";
import { Toaster, toast } from "sonner";

const EditProductForm = ({ passedDataProduct, setPassedDataProduct = {} }) => {
  const initialNameProduct = passedDataProduct.name;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPassedDataProduct((preadmin) => {
      return { ...preadmin, [name]: value };
    });
  };

  const handleChangeSelect = (value) => {
    console.log("value: ", value);
    setPassedDataProduct((preadmin) => {
      return { ...preadmin, category: value };
    });
  };

  console.log("re render!", passedDataProduct);
  return (
    <div className="form-container rounded-md col-span-2 bg-white py-6">
      <form
        action=""
        className="grid grid-cols-2 mx-auto gap-3 bg-white
      "
      >
        <div>
          <TextField
            id="filled-basic"
            label="Product Name"
            variant="filled"
            name="name"
            onChange={handleChangeInput}
            value={passedDataProduct.name || ""}
            className="w-full"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Thumb"
            variant="filled"
            name="thumb"
            onChange={handleChangeInput}
            value={passedDataProduct.thumb || ""}
            className="w-full"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Price"
            variant="filled"
            name="price"
            onChange={handleChangeInput}
            value={passedDataProduct.price || ""}
            className="w-full"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Quantity"
            variant="filled"
            name="quantity"
            onChange={handleChangeInput}
            value={passedDataProduct.quantity || ""}
            className="w-full"
          />
        </div>

        <div className="selectInput col-span-2">
          <Select
            showSearch
            style={{
              width: 472,
              height: 58,
            }}
            className="w-full"
            fieldNames={"category"}
            defaultValue={passedDataProduct.category}
            placeholder="Search to Select Category"
            optionFilterProp="label"
            onChange={handleChangeSelect}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            size="large"
            options={[
              {
                value: "Smartphone",
                label: "Smartphone",
              },
              {
                value: "Printer",
                label: "Printer",
              },
              {
                value: "Accessories",
                label: "Accessories",
              },
              {
                value: "Television",
                label: "Television",
              },
              {
                value: "Speaker",
                label: "Speaker",
              },
              {
                value: "supercar",
                label: "Supercar",
              },
            ]}
          />
        </div>
      </form>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default EditProductForm;
