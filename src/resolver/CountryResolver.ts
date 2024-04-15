import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entity/Country";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async countries() {
    return Country.find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string) {
    return Country.findOneBy({ code });
  }

  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode", { nullable: true }) continentCode?: string
  ): Promise<Country> {
    const country = Country.create({
      code,
      name,
      emoji,
      continentCode
    });
    await country.save();
    return country;
  }

  @Query(() => [Country])
  async countriesByContinent(@Arg("continentCode") continentCode: string) {
    return Country.find({ where: { continentCode } });
  }
}
