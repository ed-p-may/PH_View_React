import { useState, useEffect } from "react";
import fetchData from "../fetchAirTable";
import Page from "./Page";
import ContentBlock from "../ContentBlock";
import HomeCertificationStatus from "./HomeCertificationStatus";
import HomeCertificationLinks from "./HomeCertificationLinks";
import { apiUrlConfig } from "../../config";
import HomeCertificationNeeded from "./HomeCertificationNeeded";

type AirTableRecord = { id: string; fields: { FIELD_NAME?: string; SECTION?: string; VALUE?: string } };

function flattenData(d: AirTableRecord[]) {
  let flatData: Record<string, string | undefined> = {};
  d.forEach((item) => {
    if (item.fields !== undefined && item.fields.FIELD_NAME !== undefined) {
      flatData[item.fields.FIELD_NAME] = item.fields.VALUE;
    }
  });
  return flatData;
}

function Home() {
  const [certStatusData, setCertStatusData] = useState({});
  const [certLinkData, setCertLinkData] = useState({});
  const [certProjectData, setCertProjectData] = useState({});

  useEffect(() => {
    fetchData(apiUrlConfig).then((d: AirTableRecord[]) => {
      setCertStatusData(flattenData(d.filter((item) => item.fields.SECTION === "CERT_STATUS")));
      setCertLinkData(flattenData(d.filter((item) => item.fields.SECTION === "LINKS")));
      setCertProjectData(flattenData(d.filter((item) => item.fields.SECTION === "PROJ_DATA")));
    });
  }, []);

  return (
    <Page>
      <ContentBlock>
        <HomeCertificationStatus statusData={certStatusData} linkData={certLinkData} projData={certProjectData} />
      </ContentBlock>
      <ContentBlock>
        <HomeCertificationLinks statusData={certStatusData} linkData={certLinkData} projData={certProjectData} />
      </ContentBlock>
      <ContentBlock>
        <HomeCertificationNeeded statusData={certStatusData} linkData={certLinkData} projData={certProjectData} />
      </ContentBlock>
    </Page>
  );
}

export default Home;