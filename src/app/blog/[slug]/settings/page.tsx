interface SettingsPageProps {
  params: {
    id: string;
  };
}

const SettingsPage = ({ params }: SettingsPageProps) => {
  return <div>Settings page for slug: {params.id}</div>;
};

export default SettingsPage;
