
export interface ICoin {
    uuid:           string;
    symbol:         string;
    name:           string;
    color:          null | string;
    iconUrl:        string;
    marketCap:      string;
    price:          string;
    listedAt:       number;
    tier:           number;
    change:         string;
    rank:           number;
    sparkline:      string[];
    lowVolume:      boolean;
    coinrankingUrl: string;
    "24hVolume":    string;
    btcPrice:       string;
}
