import axios from 'axios';
import { BASEURL } from '../Assets/URLS';
import getHeaderToken from '../Helpers/getHeaderToken';

export function listComments() {
   return async function (dispatch) {
      try {
         dispatch({ type: "COMMENT_LIST_REQUEST" });
         const { data } = await axios.get(`${BASEURL}/comments`);
         dispatch({ type: "COMMENT_LIST_SUCCESS", payload: data });
      } catch (error) {
         dispatch({
            type: "COMMENT_LIST_FAIL",
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         });
      }
   }
}

export const postReview = (comment) => async (dispatch) => {
   try {

      const { data } = await axios.post(
         `${BASEURL}/comments`,
         comment,
         getHeaderToken()
      );
      dispatch({
         type: "REVIEW_POST",
         payload: data,
      });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      dispatch({
         type: "REVIEW_POST_FAIL",
         payload: message,
      });
   }
};

export const putComment = (comment) => async (dispatch) => {
   try {
      const { data } = await axios
         .put(`${BASEURL}/${comment._id}`, comment);
      dispatch({ type: "COMMENT_PUT", payload: data });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      dispatch({
         type: "COMMENT_PUT_FAIL",
         payload: message,
      });
   }
};

export const deleteComment = (comment) => async (dispatch) => {
   try {

      if (comment._id) {
         await axios.delete(`${BASEURL}/${comment._id}`, getHeaderToken());
      }

      dispatch({ type: "COMMENT_DELETE", payload: comment });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      dispatch({
         type: "COMMENT_DELETE_FAIL",
         payload: message,
      });
   }
};

export function getCommentByProductId(id) {
   return async function (dispatch) {
      try {
         const { data } = await axios.get(`${BASEURL}/comments/` + id);
         dispatch({ type: "GET_COMMENT_BY_PRODUCT", payload: data });
      } catch (error) {
         console.log(error)
      }
    }   
}

export function getProductRating(idProduct) {
   return async function (dispatch) {
      try {
         const { data } = await axios.get(`${BASEURL}/comments/rating/` + idProduct);
         dispatch({ type: "GET_PRODUCT_RATING", payload: data });
      } catch (error) {
         console.log(error)
      }
    }   
}