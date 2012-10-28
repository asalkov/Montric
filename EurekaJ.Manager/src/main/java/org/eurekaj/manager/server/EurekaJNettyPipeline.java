package org.eurekaj.manager.server;

import java.io.File;
import java.util.LinkedHashMap;

import org.apache.log4j.Logger;
import org.eurekaj.manager.server.handlers.CacheableFileServerHandler;
import org.eurekaj.manager.server.router.RouterHandler;
import org.eurekaj.manager.server.handlers.AlertChannelHandler;
import org.eurekaj.manager.server.handlers.ChartChannelHandler;
import org.eurekaj.manager.server.handlers.EmailChannelHandler;
import org.eurekaj.manager.server.handlers.InstrumentationGroupChannelHandler;
import org.eurekaj.manager.server.handlers.MainMenuChannelHandler;
import org.eurekaj.manager.server.handlers.LiveStatisticsChannelHandler;
import org.eurekaj.manager.server.handlers.UserChannelhandler;
import org.jboss.netty.channel.ChannelHandler;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.handler.codec.http.HttpChunkAggregator;
import org.jboss.netty.handler.codec.http.HttpRequestDecoder;
import org.jboss.netty.handler.codec.http.HttpResponseEncoder;
import org.jboss.netty.handler.stream.ChunkedWriteHandler;

public class EurekaJNettyPipeline implements ChannelPipelineFactory {
	private static Logger logger = Logger.getLogger(EurekaJNettyPipeline.class.getName());
	private RouterHandler routerHandler = null;
	
	public EurekaJNettyPipeline() {
		
	}
	
	@Override
	public ChannelPipeline getPipeline() throws Exception {
		ChannelPipeline pipeline = Channels.pipeline();
        pipeline.addLast("decoder", new HttpRequestDecoder());
        pipeline.addLast("aggregator", new HttpChunkAggregator(1048576));
        pipeline.addLast("encoder", new HttpResponseEncoder());
        pipeline.addLast("chunkedWriter", new ChunkedWriteHandler());

        if (routerHandler == null) {
        	logger.info("Building routerHandler for pipeline");
        	LinkedHashMap<String, ChannelHandler> routes = new LinkedHashMap<String, ChannelHandler>();
            routes.put("equals:/mainMenu.json", new MainMenuChannelHandler());
            routes.put("startsWith:/chart.json", new ChartChannelHandler());
            routes.put("equals:/alert", new AlertChannelHandler());
            routes.put("equals:/email", new EmailChannelHandler());
            routes.put("equals:/chartGroup", new InstrumentationGroupChannelHandler());
            routes.put("equals:/liveStatistics", new LiveStatisticsChannelHandler());
            routes.put("equals:/user", new UserChannelhandler());
            
            String webappDir = System.getProperty("basedir");
            
    		routerHandler = new RouterHandler(routes, false, new CacheableFileServerHandler(webappDir, 0));
        }
        
        pipeline.addLast("handler_routeHandler", routerHandler);
        return pipeline;
	}

	
}