function ImagenComponent(props) {
  const { filename } = props;
  const imageUrl = `http://localhost:3000/images/${filename}`;
  return (
    <div>
      <img
        style={{ width: "80px", height: "90px" }}
        src={imageUrl}
        alt="Imagen del libro"
      />
    </div>
  );
}

export default ImagenComponent;
