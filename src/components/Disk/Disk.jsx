import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFile } from "../../features/fileSlice";

const Disk = () => {
  const { id } = useParams();
  const dispath = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);

  console.log(currentDir);

  useEffect(() => {
    dispath(fetchFile({ room: id }));
  }, [dispath]);

  return <div>qwert</div>;
};

export default Disk;
