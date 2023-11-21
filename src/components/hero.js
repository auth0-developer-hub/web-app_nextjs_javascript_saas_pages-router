// import Image from "next/image";
// import Link from "next/link";
// import companyA from "../../public/companyA.svg";
// import companyB from "../../public/companyB.svg";
// import companyC from "../../public/companyC.svg";
// import companyD from "../../public/companyD.svg";
// import companyE from "../../public/companyE.svg";
// import heroImg from "../../public/hero.png";
// import Container from "./container";

// export default function Hero() {
//   return (
//     <>
//       <Container className="flex flex-wrap">
//         <div className="flex items-center w-full lg:w-1/2 md:w-2/3 max-w-2xl">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight">
//               <p>
//                 The next era of business thrives on
//                 <span className="text-[#EC0B5C]"> learning</span>
//               </p>
//             </h1>
//             <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl ">
//               We are the integrated learning solution that delivers impactful
//               programs for everyone.
//             </p>

//             <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
//               <Link href="/pricing">
//                 <button className="text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500">
//                   Get Started
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center justify-center w-full sm:w-1/3 lg:w-1/2">
//           <div>
//             <Image
//               src={heroImg}
//               alt="My Learning"
//               width={450}
//               height="auto"
//               priority={true}
//             />
//           </div>
//         </div>
//       </Container>
//       <Container>
//         <div className="flex flex-col justify-center">
//           <div className="text-xl text-center text-gray-700">
//             Trusted by <span className="font-semibold">enterprise leaders</span>
//             , trusted by <span className="font-semibold">you</span>
//           </div>

//           <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around align-bottom text-center ">
//             <div className="pt-2 text-gray-400">
//               <Image src={companyC} alt="Company C" width={110} height="auto" />
//             </div>
//             <div className="text-gray-400">
//               <Image src={companyB} alt="Company B" width={75} height="auto" />
//             </div>
//             <div className="text-gray-400">
//               <Image src={companyD} alt="Company D" width={55} height="auto" />
//             </div>
//             <div className="pt-1 text-gray-400">
//               <Image src={companyA} alt="Company A" width={95} height="auto" />
//             </div>
//             <div className="pt-2 text-gray-400">
//               <Image src={companyE} alt="Company E" width={65} height="auto" />
//               {/* <span>TwistCart</span> */}
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }
import Image from "next/image";
import LC from "../../public/LC.png";
import build from "../../public/Vfb.png";
import drag from "../../public/drag.png";
import emb from "../../public/embeddings.png";
import pipe from "../../public/pipe.png";
import scale from "../../public/scale.png";
import sync from "../../public/sync.png";
import home from "../../public/vfhome.gif";

const Hero = () => (
  <div className="software-company-website">
    <div className="hero-wrapper">
      <div className="hero-wrapper-text">
        <div className="header-text">
          <div className="h-1-primary-text">
            <span>
              <span className="h-1-primary-text-span"></span>
              <span className="h-1-primary-text-span2">Low Code ETL</span>
              <span className="h-1-primary-text-span3"></span>
              <span className="h-1-primary-text-span4">
                <br />
              </span>
              <span className="h-1-primary-text-span5">for Unstructured Data</span>
              <span className="h-1-primary-text-span4">
                <br />
              </span>
              <span className="h-1-primary-text-span6">& GenAI Platform</span>
            </span>
          </div>
        </div>
        <div className="btn-primary">
          <div className="let-s-get-started">Let’s get started!</div>
        </div>
        <div className="additional-text">
          A SaaS based low code ETL pipeline for creating high-quality vector
          embedding<br /> of unstructured data to build Generative AI
          applications.
        </div>
      </div>
      <div className="hero-wrapper-image">
        <div className="hero-wrapper-image-center">
          <Image className="web-development-1" src={home} alt="Hero Image" />
        </div>
      </div>
    </div>

    <div className="heading-h-2-left4">
      <h2>Features of VectrFlow</h2>
    </div>

    <div className="frame-54">
      <div className="frame-53">
        <div className="way-building-details">
          <div className="frame-47">
            <div className="build-the-right-team-to-scale">Build</div>
            <div className="frame-48">
              <div className="finding-the-right-talent-is-not-easy-we-help-you-find-the-talent-that-suits-your-needs-follows-your-processes-and-sticks-with-you-long-term-not-the-case-with-freelancers">
                Automate processes by drag and dropping AI models, data loaders,
                and plugins.
              </div>
              <div className="frame-49">
                <div className="our-delivery-model-helps-you-cut-costs-and-deliver-within-budget"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-46"></div>
        <Image className="rectangle-17" src={build} alt="Build Image" />
      </div>
    </div>

    <div className="card-sm">
      <div className="rectangle-21"></div>
      <div className="frame-57">
        <div className="group-34">
          <div className="rectangle-27"></div>
        </div>
        <div className="frame-56">
          <div className="card-main-title">
            Low code drag and drop functionality
          </div>
          <div className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code">
            <span>
              <span className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code-span">
                Low code drag and drop functionality is a user-friendly
                development approach that simplifies application creation. It
                employs a visual interface where users can easily design and
                build elements by dragging and dropping components onto a
                canvas. This approach reduces the need for extensive coding,
                making it accessible to non-developers.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="card-sm2">
      <div className="rectangle-21"></div>
      <div className="frame-57">
        <div className="group-34">
          <div className="rectangle-272"></div>
        </div>
        <div className="frame-56">
          <div className="card-main-title">Automated Data Ingestion Pipeline</div>
          <div className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code">
            <span>
              <span className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code-span4">
                An Automated Data Ingestion Pipeline is a structured data
                workflow that efficiently collects, transforms, and loads data
                from various sources into a central repository or data
                warehouse. This pipeline automates the often complex and
                time-consuming process of data acquisition, ensuring data
                quality and consistency.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="card-sm3">
      <div className="rectangle-21"></div>
      <div className="frame-57">
        <div className="group-34">
          <div className="rectangle-273"></div>
        </div>
        <div className="frame-56">
          <div className="card-main-title">Vectorstore and computed Embeddings</div>
          <div className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code">
            <span>
              <span className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code-span7">
                "Vectorstore" refers to a repository or database that stores
                vector representations of data points or entities. Computed
                embeddings, in this context, are vectors generated through
                techniques like word embeddings (e.g., Word2Vec or GloVe) or
                deep learning models.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="card-sm4">
      <div className="rectangle-21"></div>
      <div className="frame-57">
        <div className="group-34">
          <div className="rectangle-274"></div>
        </div>
        <div className="frame-56">
          <div className="card-main-title">Scalable data Pipeline</div>
          <div className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code">
            <span>
              <span className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code-span10">
                A scalable data pipeline is a sophisticated architecture that
                can efficiently process, transform, and transmit large volumes
                of data. It's designed to adapt to growing data needs, ensuring
                seamless performance and accommodating increasing data volumes,
                making it ideal for organizations with dynamic data
                requirements.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="card-sm5">
      <div className="rectangle-21"></div>
      <div className="frame-57">
        <div className="group-34">
          <div className="rectangle-275"></div>
        </div>
        <div className="frame-56">
          <div className="card-main-title">
            Streamline Langchain and LlamaIndex development
          </div>
          <div className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code">
            <span>
              <span className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code-span13">
                To streamline Langchain and LlamaIndex development, prioritize
                clear project roadmaps and agile methodologies, enhance
                cross-team collaboration and communication, and leverage
                modular, reusable code components for efficient coding and
                testing, ultimately accelerating the development process and
                improving product quality.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="card-sm6">
      <div className="rectangle-21"></div>
      <div className="frame-57">
        <div className="group-34">
          <div className="rectangle-276"></div>
        </div>
        <div className="frame-56">
          <div className="card-main-title">
            Periodic data Sync and pay as you use
          </div>
          <div className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code">
            <span>
              <span className="unlike-other-companies-we-are-a-ux-first-development-company-projects-are-driven-by-designers-and-they-make-sure-design-and-experiences-translate-to-code-span16">
                Periodic data sync refers to the scheduled and automatic
                updating of information between systems or databases at regular
                intervals, ensuring data consistency and accuracy. "Pay as you
                use" implies a pricing model where customers are billed based on
                the actual resources or services they consume, promoting cost
                efficiency and scalability.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <Image className="heart-rate-perspective-matte" src={sync} alt="Sync Image" />
    <div className="code-perspective-matte2"></div>
    <Image className="code-perspective-matte3" src={pipe} alt="Pipe Image" />
    <Image className="shield-perspective-matte" src={emb} alt="Embeddings Image" />
    <Image className="padlock-perspective-matte" src={scale} alt="Scale Image" />
    <Image className="success-perspective-matte" src={LC} alt="LC Image" />
    <Image className="rocket-perspective-matte" src={drag} alt="Drag Image" />

    <div className="footer-section">
      <div className="rectangle-34"></div>
      <div className="group-78"></div>

      <div className="_2023-copyright-by-agency-solutions-all-rights-reserved">
        © 2023 Copyright by VectrFlow. All rights reserved.
      </div>
    </div>
  </div>
);

export default Hero;
