import React, { useEffect } from "react";
import CreatePosts from "./CreatePosts";
import MyPosts from "./MyPosts";
import { useDispatch, useSelector } from "react-redux";
import { getPostData, postReset } from "../../features/posts/postSlice";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import PostLoader from "./PostLoader";

const Posts = () => {
  const { postLoading, postSuccess, postMessage, postError, posts } =
    useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (postError) {
      toast(postMessage);
    }
    dispatch(getPostData());

    dispatch(postReset());
  }, [dispatch]);
  return (
    <>
      <div className="col-xxl-6 col-xl-10 col-lg-10 mx-auto">
        <CreatePosts />
        {postLoading ? (
          <PostLoader />
        ) : (
          <>
            {posts?.map((item, index) => {
              return <MyPosts key={index} {...item} />;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
