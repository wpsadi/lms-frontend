for deployment in vercel and to resolve the issue of react-router-reloading the page

## ceate a file  vercel.json

and write this in it 


{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}