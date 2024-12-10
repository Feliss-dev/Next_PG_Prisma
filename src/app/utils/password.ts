import bcrypt from 'bcrypt';

// Mã hóa mật khẩu

// Hàm băm mật khẩu
export function saltAndHashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// Hàm kiểm tra mật khẩu
export function verifyPassword(inputPassword: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}