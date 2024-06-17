import * as bcrypt from 'bcrypt';

export class Crypt {
  private readonly saltRounds = 10;

  public async passwordHash(password: string): Promise<string> {
    return bcrypt.hash(password, await bcrypt.genSalt(this.saltRounds));
  }

  public async passwordCompare(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
