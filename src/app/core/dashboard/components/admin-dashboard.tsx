import { loadLookerDashboardUrl } from "../actions";

export default async function AdminDashboard() {
  const url = await loadLookerDashboardUrl();

  const width = "100%";
  const height = "840";
  return (
    <iframe
      title="Admin Dashboard"
      width={width}
      height={height}
      src={url}
      allowFullScreen
      sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    ></iframe>
  );
}
