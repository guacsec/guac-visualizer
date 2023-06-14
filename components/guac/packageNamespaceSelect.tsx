import client from "@/apollo/client";
import { GetPkgNamesDocument } from "@/gql/__generated__/graphql";
import PackageGenericSelector, {
  PackageSelectorOption,
} from "@/components/guac/packageGenericSelector";

const PackageNamespaceSelect = ({
  label,
  options,
  setPackageNamespaceFunc,
  setPackageNamesFunc,
  packageType,
  resetNamespaceFunc,
  ...rest
}: {
  label: string;
  options: PackageSelectorOption<string>[];
  setPackageNamespaceFunc: (value: string) => void;
  setPackageNamesFunc: (value: PackageSelectorOption<string>[]) => void;
  packageType: string;
  resetNamespaceFunc: () => void;
}) => {
  const onSelectPackageNamespace = (value: string) => {
    resetNamespaceFunc();
    setPackageNamespaceFunc(value);

    const packageNameQuery = client.query({
      query: GetPkgNamesDocument,
      variables: {
        spec: {
          namespace: value,
          type: packageType,
        },
      },
    });

    packageNameQuery.then((res) => {
      const sortablePackageNames = [
        ...(res.data.packages[0].namespaces[0].names ?? []),
      ];

      setPackageNamesFunc(
        sortablePackageNames
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((t) => ({ label: t.name, value: t.name }))
      );
    });
  };

  return (
    <PackageGenericSelector
      label={label}
      options={options}
      onSelect={onSelectPackageNamespace}
      {...rest}
    />
  );
};

export default PackageNamespaceSelect;
