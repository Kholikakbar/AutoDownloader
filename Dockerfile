FROM node:18-slim

# Install system dependencies
# python3: required for yt-dlp
# ffmpeg: required for merging video+audio
# curl: to download yt-dlp
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install yt-dlp directly from github to get latest version
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Create app directory with permissions for HF user
WORKDIR /app
RUN chown -R 1000:1000 /app

# Switch to non-root user (Required for Hugging Face Spaces)
USER 1000

# Copy package files from server folder
COPY --chown=1000:1000 server/package*.json ./

# Install dependencies
RUN npm install

# Copy app source from server folder
COPY --chown=1000:1000 server/ .

# Create downloads directory with write permissions
RUN mkdir -p downloads

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

# Start server
CMD ["node", "index.js"]
