import { Button } from "./Button";

export function Footer() {
  return (
    <div className="flex items-start gap-6">
      <Button content="about us" path="/about" />
      <Button content="pt" path="/en" />
    </div>
  );
}
