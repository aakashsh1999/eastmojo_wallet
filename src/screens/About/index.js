import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="relative container py-10">
      <Link to="/home" className="flex items-center ">
        <AiFillCaretLeft className="text-3xl text-primary" />
        <p className="ml-1 text-lg text font-bold"> Back</p>
      </Link>
      <h2 className="max-w-[300px] text mt-6 text-5xl font-extrabold  leading-[3.5rem]">
        About Us
      </h2>
      <div className="mt-10">
        <p className=" text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint non est
          porro iure ipsum nemo hic ea voluptate voluptates nihil quia nobis
          debitis delectus, sed excepturi quidem eaque culpa veritatis placeat
          blanditiis dicta dolores quis a itaque? Possimus quibusdam et
          temporibus totam mollitia cupiditate quo obcaecati. Hic repudiandae
          <br />
          <br />
          eaque provident nostrum, maxime, laudantium quas nisi unde ipsum alias
          necessitatibus officia quidem vel! Minima reprehenderit accusantium
          dolore cum natus inventore pariatur temporibus! Minus pariatur veniam
          voluptas! Aperiam quas ipsam inventore, ipsa excepturi vel a cumque
          voluptatibus consectetur facere rem officia vero consequatur fuga
          iusto minima sit, nam sint iure! Vitae, fuga.
        </p>
      </div>
    </div>
  );
};

export default About;
