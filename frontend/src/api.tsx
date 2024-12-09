import axios from "axios";
import { CompanyProfile, CompanySearch } from "./company";

interface SearchRes {
    data: CompanySearch[];
}

export const searchCompanies = async (query:string) => {
    try {
        const res = await axios.get<SearchRes>(
            `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return res;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "Unexpected Error has occurred";
        }
    }
}

export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    }
    catch (error: any) {
        console.log("error message from API:", error.message)
    }
}