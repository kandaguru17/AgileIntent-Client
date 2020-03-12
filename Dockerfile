## Stage 1 - Lets build the "deployable package"
FROM tiangolo/node-frontend:latest as ai-frontend-build
WORKDIR /agileIntent/frontend


# Step 1 - Download all package dependencies first.
# We will redownload dependencies only when packages change.
COPY package.json package-lock.json ./
RUN npm install

# Step 2 - Copy all source and run build
COPY . ./
RUN npm run build

## Stage 2 - Let's build a minimal image with the "deployable package"
FROM nginx:latest
COPY --from=ai-frontend-build /agileIntent/frontend/build /usr/share/nginx/html
COPY --from=ai-frontend-build /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]