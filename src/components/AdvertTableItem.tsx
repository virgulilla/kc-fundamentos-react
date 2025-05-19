interface AdvertTableItemProps {
  name: string;
}

export const AdvertTableItem = ({ name }: AdvertTableItemProps) => {
  return (
    <th className="border-border dark:border-dark-border border px-4 py-2">
      {name}
    </th>
  );
};
