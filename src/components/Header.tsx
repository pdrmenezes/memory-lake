import { Button } from "./Button";

export function Header() {
  return (
    <div className="flex gap-6">
      <Button content="register" path="/register" />
      <Button content="login" path="/login" />
    </div>
  );
}
