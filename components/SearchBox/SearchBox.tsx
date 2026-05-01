import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (e: string) => void;
  value: string;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
      defaultValue={value}
    />
  );
}
