# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — Gemini AI Clone (Static Site)
# Serves the app via Nginx on port 80
# ─────────────────────────────────────────────────────────────────────────────

# Use the official lightweight Nginx image based on Alpine Linux (~5 MB)
FROM nginx:alpine

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static site files into the Nginx web root
COPY Gemni-clone/ /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Start Nginx in the foreground (required for Docker containers)
CMD ["nginx", "-g", "daemon off;"]
