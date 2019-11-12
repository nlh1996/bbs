FROM node
#FROM alpine:latest

#VOLUME /data

#工作目录
WORKDIR /data

#游戏端口
EXPOSE 11900

CMD ["./bbs_server"]
