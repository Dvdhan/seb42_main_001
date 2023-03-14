package com.codestates.server_001_withskey.global.security.Jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// OAuth2 인증에 성공하면 FE 앱 쪽에서 request를 전송할 때 마다
// Authorization header에 실어 보내는 Access Token에 대한
// 검증을 수행하는 역
// add v2
@Component
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final withsKeyAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, withsKeyAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.replace("Bearer ","");
            try {
                Map<String, Object> claims = verifyJws(token);
                setAuthenticationToContext(claims);
            } catch (SignatureException se) {
                request.setAttribute("exception", se);
            } catch (ExpiredJwtException ee) {
                // token이 만료가 될 경우, Request header에서 Refresh Token을 가져온다.

                Map<String, Object> refreshTokenClaims = new HashMap<>();

                String refreshToken = request.getHeader("Refresh");

                try{
                    refreshTokenClaims = verifyJws(refreshToken);
                } catch (ExpiredJwtException e){
                    response.sendRedirect("http://localhost:8080/oauth2/authorization/google");
                    log.info("리다이렉트 요청은 성공");
                    return;
                }


                int epochTime = (Integer) refreshTokenClaims.get("exp");
                // 1000L = 1 sec
                Date refreshTokenExpiration = new Date(epochTime * 1000L*60);
                if (refreshTokenExpiration.before(new Date())) {
//                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
//                            "Refresh Token has expired. Please re-login"
                    response.sendRedirect("http://localhost:8080/oauth2/authorization/google");
                    log.info("리다이렉트 요청 성공!");
                }


                // Regenerate new Access Token from JwtTokenizer class.
                String newAccessToken = jwtTokenizer.regenerateAccessToken(refreshToken);

                // Set new Access Token to response header
                response.setHeader("Authorization", "Bearer " + newAccessToken);

            } catch (Exception e) {
                request.setAttribute("exception", e);
            }
        }
        filterChain.doFilter(request, response);
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(String jws) {
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        return claims;
    }
    private void setAuthenticationToContext(Map<String, Object> claims) {
        Long memberId = (Long) claims.get("memberId");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(memberId,null,authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
