import GptSummaryGenerator from "./PdfPptTextExtractor";
import {Toaster} from "sonner";
import React from "react";

const Home = () => {

  return(
    <>
      <Toaster
        position={'top-right'}
      />
      <GptSummaryGenerator />
    </>
  )
}

export default Home;
