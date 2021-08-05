import classes from "./MealsSummary.module.css";

const MealsSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered to You</h2>
      <p>
        We offer a variety of appetizing recipes from a total of 26 diverse
        cuisines and 10 different diets, so choose your favorite dish from 
        our broad selection of avilable recipes and let's start cooking!
      </p>
    </section>
  );
};

export default MealsSummary;
