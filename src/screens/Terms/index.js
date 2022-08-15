import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const Term = () => {
  return (
    <div className="relative container py-10">
      <Link to="/home" className="flex items-center ">
        <AiFillCaretLeft className="text-3xl text-primary" />
        <p className="ml-1 text-lg text font-bold"> Back</p>
      </Link>
      <h2 className="max-w-[300px] text mt-6 text-5xl font-extrabold  leading-[3.5rem]">
        Terms & Conditions
      </h2>
      <div className="mt-10 text-white text-sm">
        <p className=" ">
          Beyond Imagination Technologies Private Limited (hereinafter referred
          to as “BIT”, “us”, “we” or “our”) is committed to respecting your
          privacy and complying with applicable data protection and privacy laws
          of India. This Policy applies to the Sites, applications, products and
          services (collectively, “Services”) on or in which it is posted,
          linked, or referenced.  We understand that confidentiality of
          information is important to the visitors to our website and are
          committed to ensuring that your privacy is protected. This Privacy
          Policy of Beyond Imagination Technologies Private Limited 
          <b>(“Privacy Policy”)</b> provides detailed information on the
          reasoning and purpose behind collection of your personal information,
          and procedures that we have in place to safeguard your privacy as per
          the prevalent data protection guidelines.
          <br />
          <br />
          By accessing and using our website as well as the solutions provided
          by us, and submitting your information to us by email, through our
          website or otherwise, you shall be deemed to have consented to the
          collection and use of that information as set out in this Privacy
          Policy. This Privacy Policy and the<b> Terms of Use</b> will govern
          your use of the Website as well as all other applications being
          provided by us now, or in future. By accessing or using our Services
          and features, you are accepting the practices described in this
          Privacy Policy. In this Privacy Policy, meanings as ascribed to the
          terminologies in the Terms of Use shall be applicable. In general, you
          can visit Our Website without telling us who you are or revealing any
          personal information about yourself (such as your name, company, phone
          number, address or email address).
        </p>
        <br />
        <p>
          <b>Data Privacy Notice:</b>
          <br />
          Under the EU General Data Protection Regulation (GDPR) guidelines,
          individuals / organizations are given rights over the use of their
          personal data. When you provide us with your personal data, we are
          required to give you certain information including your rights.   
        </p>
        <br />
        <p>
          <b>What are the purposes for which BIT uses cookies?</b>
          <br />
          Cookie is a small text file which saves your browsing information for
          better future preferences.
          <br />
          Following are the purposes for which cookies are used:
        </p>
        <ul className=" list-decimal pl-6 mt-2">
          <li>
            Traffic Monitoring of our website and the solutions provided by us
          </li>
          <li>IP address from which you access the Website</li>
          <li>
            Type of device and operating system used to access the Website
          </li>
          <li>Date and Time of your access to the Website</li>
          <li>Pages that you visit</li>
        </ul>
        <br />
        <p>
          You may be asked to give us more specific information about yourself.
          For example, if you are seeking information about us or our products,
          we may ask you to share your name, company name, e-mail address, and
          phone number (“User Information”). Supplying such information to us is
          optional, but you may be unable to complete request/ enquiry
          submission without providing us with such information. Processing of
          your data is lawful and necessary for the performance of a contract as
          mentioned under <b>Article 6(1)(b) of GDPR.</b>
        </p>
        <br />
        <p>
          It is hereby expressly clarified to you that we do not make any
          personal information available to third parties. We do not sell lists,
          accept advertising, or generate any third-party revenue from the data
          that is generated from this Website. We may, however, utilize third
          parties who we partner with to provide services on our behalf. Such
          third parties are required to maintain the confidentiality of all
          information and are prohibited from using any information for any
          purpose other than as authorized by us.
        </p>
        <br />
        <h2 className="font-bold"> Data collected by BIT:</h2>
        <ul className=" list-decimal pl-6 mt-2">
          <li>
            Our web server collects IP addresses to obtain certain aggregate
            information concerning the use of Our Website. An IP address is a
            number that is automatically assigned to Your computer whenever You
            are surfing the web;
          </li>
          <li>
            In addition to the IP address we may collect non-personally
            identifiable information which is information, by itself, cannot be
            used to identify or contact you, including demographic information
            (such as age, profession, company industry, current location, or zip
            code), browser types, domain names, and statistical data involving
            the use of the Company’s Website;
          </li>
          <li>Information provided by you when creating an account;</li>
          <li>
            Information provided by you when contacting us for an enquiry such
            as your name, email address, phone number, the contents of the
            message and/or attachments you may send us, and any other
            information you may choose to provide.
          </li>
          <li>
            Information provided by you when scheduling a meeting or asking for
            a demo of our services;
          </li>
          <li>
            Information relating to any services purchased or for any
            transaction you entered into.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Term;
