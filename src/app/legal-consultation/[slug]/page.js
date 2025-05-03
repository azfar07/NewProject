
import LegalConsultation from "../../../components/LegalConsultationPage/LegalConsultation";


export default async function Page({ params }) {
  // params is a Promise<{ slug: string }>
  const { slug } = await params;
  return <LegalConsultation slug={slug} />;
}