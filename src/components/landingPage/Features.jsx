import {
  Brain,
  MessageSquare,
  Folder,
  FileText,
  Users,
  Sliders,
} from "lucide-react";

const Features = () => {
  const featuresData = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Quick Summaries",
      description:
        "Get the gist of lengthy documents in seconds with our advanced AI.",
    },
    {
      icon: <MessageSquare className="w-10 h-10" />,
      title: "AI-Powered Q&A",
      description:
        "Ask any question about your PDF and receive instant, accurate answers.",
    },
    {
      icon: <Folder className="w-10 h-10" />,
      title: "Document Storage",
      description:
        "Securely store and organize all your summarized documents for easy access.",
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Multi-format Support",
      description:
        "Summarize PDFs, Word documents, and even web articles with ease.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Collaborative Sharing",
      description:
        "Share summaries with your team and get feedback efficiently.",
    },
    {
      icon: <Sliders className="w-10 h-10" />,
      title: "Customizable Length",
      description:
        "Control the summary length to fit your specific needs, from bullet points to detailed overviews.",
    },
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl title-font text-gray-900 mb-4 font-extrabold">
            Key Features
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
            Discover how our AI-powered platform helps you summarize, organize,
            and collaborate with ease.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-[#0396F2] inline-flex"></div>
          </div>
        </div>

        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="p-4 md:w-1/3 flex flex-col text-center items-center"
            >
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-[#0396F2] mb-5 flex-shrink-0">
                {feature.icon}
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  {feature.title}
                </h2>
                <p className="leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;