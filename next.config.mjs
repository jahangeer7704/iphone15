/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return[
            {
                source:"/",
                destination:"/iphone15",
                permanent:true
            }
        ]
    }
};

export default nextConfig;
