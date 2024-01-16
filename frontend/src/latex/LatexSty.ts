export const latexSty = "% annotations.sty file\n" +
    "\\ProvidesPackage{annotation}\n" +
    "\n" +
    "% Load required packages\n" +
    "\\RequirePackage{hyperref}\n" +
    "\\RequirePackage{listings}\n" +
    "\\RequirePackage{tcolorbox}\n" +
    "\\RequirePackage{tikz}\n" +
    "\n" +
    "\\newcommand{\\AnnotationImage}{\n" +
    "\\definecolor{c265788}{RGB}{38,87,136}\n" +
    "\\definecolor{c3776ba}{RGB}{55,118,186}\n" +
    "\\definecolor{c3777b7}{RGB}{55,119,183}\n" +
    "\\def \\globalscale {0.2500000}\n" +
    "\\begin{tikzpicture}[y=1cm, x=1cm, yscale=\\globalscale,xscale=\\globalscale, every node/.append style={scale=\\globalscale}, inner sep=0pt, outer sep=0pt]\n" +
    "  \\path[fill=c265788] (5.3446, 0.6615) -- (6.2574, 0.6615) -- (9.1308, 5.1303) -- (8.1756, 5.1329) -- cycle;\n" +
    "\n" +
    "\n" +
    "\n" +
    "  \\path[fill=c3776ba] (6.2177, 0.6615) -- (16.801, 0.6615) -- (19.6321, 5.1329) -- (9.1017, 5.1329) -- cycle;\n" +
    "\n" +
    "\n" +
    "\n" +
    "  \\path[fill=white,even odd rule] (10.8479, 3.5851) -- (10.9617, 3.556) .. controls (10.9388, 3.4625) and (10.8955, 3.3902) .. (10.832, 3.339) .. controls (10.7685, 3.2897) and (10.6918, 3.265) .. (10.6019, 3.265) .. controls (10.5084, 3.265) and (10.4316, 3.2844) .. (10.3717, 3.3232) .. controls (10.3135, 3.362) and (10.2694, 3.4175) .. (10.2394, 3.4899) .. controls (10.2076, 3.5622) and (10.1918, 3.6398) .. (10.1918, 3.7227) .. controls (10.1918, 3.8144) and (10.2094, 3.8938) .. (10.2447, 3.9608) .. controls (10.2799, 4.0278) and (10.3293, 4.079) .. (10.3928, 4.1143) .. controls (10.4563, 4.1495) and (10.5269, 4.1672) .. (10.6045, 4.1672) .. controls (10.6909, 4.1672) and (10.7641, 4.1451) .. (10.8241, 4.101) .. controls (10.8841, 4.0569) and (10.9255, 3.9943) .. (10.9485, 3.9132) -- (10.8347, 3.8867) .. controls (10.8135, 3.9502) and (10.7844, 3.9961) .. (10.7474, 4.0243) .. controls (10.7086, 4.0543) and (10.6601, 4.0693) .. (10.6019, 4.0693) .. controls (10.5348, 4.0693) and (10.4784, 4.0525) .. (10.4325, 4.019) .. controls (10.3884, 3.9873) and (10.3576, 3.9441) .. (10.3399, 3.8894) .. controls (10.3205, 3.8365) and (10.3108, 3.7809) .. (10.3108, 3.7227) .. controls (10.3108, 3.6486) and (10.3214, 3.5842) .. (10.3426, 3.5295) .. controls (10.3655, 3.4749) and (10.3999, 3.4334) .. (10.4458, 3.4052) .. controls (10.4898, 3.3787) and (10.5384, 3.3655) .. (10.5913, 3.3655) .. controls (10.6565, 3.3655) and (10.7112, 3.384) .. (10.7553, 3.4211) .. controls (10.8012, 3.4581) and (10.832, 3.5128) .. (10.8479, 3.5851) -- cycle(11.1945, 3.2808) -- (11.0887, 3.2808) -- (11.0887, 4.1513) -- (11.1945, 4.1513) -- cycle(11.4697, 4.0296) -- (11.3612, 4.0296) -- (11.3612, 4.154) -- (11.4697, 4.154) -- cycle(11.4697, 3.2808) -- (11.3612, 3.2808) -- (11.3612, 3.9105) -- (11.4697, 3.9105) -- cycle(12.0438, 3.5137) -- (12.1497, 3.5004) .. controls (12.1373, 3.4264) and (12.1073, 3.369) .. (12.0597, 3.3285) .. controls (12.0138, 3.2879) and (11.9556, 3.2676) .. (11.8851, 3.2676) .. controls (11.7987, 3.2676) and (11.7299, 3.2958) .. (11.6787, 3.3523) .. controls (11.6258, 3.4087) and (11.5993, 3.4899) .. (11.5993, 3.5957) .. controls (11.5993, 3.6627) and (11.6108, 3.7218) .. (11.6337, 3.773) .. controls (11.6567, 3.8241) and (11.6911, 3.8629) .. (11.7369, 3.8894) .. controls (11.7828, 3.9141) and (11.833, 3.9264) .. (11.8877, 3.9264) .. controls (11.9565, 3.9264) and (12.0121, 3.9088) .. (12.0544, 3.8735) .. controls (12.0985, 3.84) and (12.1267, 3.7915) .. (12.1391, 3.728) -- (12.0359, 3.7121) .. controls (12.0253, 3.7544) and (12.0077, 3.7862) .. (11.983, 3.8074) .. controls (11.9565, 3.8285) and (11.9257, 3.8391) .. (11.8904, 3.8391) .. controls (11.8375, 3.8391) and (11.7942, 3.8197) .. (11.7607, 3.7809) .. controls (11.7272, 3.7421) and (11.7105, 3.6812) .. (11.7105, 3.5983) .. controls (11.7105, 3.5137) and (11.7263, 3.4519) .. (11.7581, 3.4131) .. controls (11.7898, 3.3743) and (11.8322, 3.3549) .. (11.8851, 3.3549) .. controls (11.9274, 3.3549) and (11.9627, 3.3681) .. (11.9909, 3.3946) .. controls (12.0191, 3.4193) and (12.0368, 3.459) .. (12.0438, 3.5137) -- cycle(12.3481, 3.2808) -- (12.2423, 3.2808) -- (12.2423, 4.154) -- (12.3481, 4.154) -- (12.3481, 3.6565) -- (12.6021, 3.9132) -- (12.7397, 3.9132) -- (12.4989, 3.6777) -- (12.7635, 3.2808) -- (12.6312, 3.2808) -- (12.4222, 3.6036) -- (12.3481, 3.5322) -- cycle(13.3191, 3.2808) -- (13.2133, 3.2808) -- (13.2133, 3.8285) -- (13.118, 3.8285) -- (13.118, 3.9105) -- (13.2133, 3.9105) -- (13.2133, 3.9793) .. controls (13.2133, 4.0217) and (13.2168, 4.0525) .. (13.2239, 4.0719) .. controls (13.2345, 4.1002) and (13.2521, 4.1231) .. (13.2768, 4.1407) .. controls (13.3033, 4.1584) and (13.3403, 4.1672) .. (13.3879, 4.1672) .. controls (13.4179, 4.1672) and (13.4514, 4.1637) .. (13.4885, 4.1566) -- (13.4699, 4.0614) .. controls (13.4488, 4.0666) and (13.4285, 4.0693) .. (13.4091, 4.0693) .. controls (13.3756, 4.0693) and (13.3526, 4.0622) .. (13.3403, 4.0481) .. controls (13.3262, 4.034) and (13.3191, 4.0076) .. (13.3191, 3.9688) -- (13.3191, 3.9105) -- (13.4408, 3.9105) -- (13.4408, 3.8285) -- (13.3191, 3.8285) -- cycle(13.4858, 3.5957) .. controls (13.4858, 3.7121) and (13.5184, 3.7985) .. (13.5837, 3.855) .. controls (13.6366, 3.9026) and (13.7028, 3.9264) .. (13.7821, 3.9264) .. controls (13.8686, 3.9264) and (13.9391, 3.8982) .. (13.9938, 3.8418) .. controls (14.0485, 3.7835) and (14.0758, 3.705) .. (14.0758, 3.6063) .. controls (14.0758, 3.5251) and (14.0635, 3.4607) .. (14.0388, 3.4131) .. controls (14.0159, 3.3673) and (13.9806, 3.3311) .. (13.933, 3.3046) .. controls (13.8871, 3.28) and (13.8368, 3.2676) .. (13.7821, 3.2676) .. controls (13.694, 3.2676) and (13.6225, 3.2958) .. (13.5678, 3.3523) .. controls (13.5132, 3.4087) and (13.4858, 3.4899) .. (13.4858, 3.5957) -- cycle(13.5943, 3.5957) .. controls (13.5943, 3.5145) and (13.6119, 3.4537) .. (13.6472, 3.4131) .. controls (13.6825, 3.3743) and (13.7275, 3.3549) .. (13.7821, 3.3549) .. controls (13.8351, 3.3549) and (13.8792, 3.3752) .. (13.9144, 3.4158) .. controls (13.9497, 3.4563) and (13.9674, 3.5181) .. (13.9674, 3.601) .. controls (13.9674, 3.6786) and (13.9497, 3.7377) .. (13.9144, 3.7782) .. controls (13.8792, 3.8171) and (13.8351, 3.8365) .. (13.7821, 3.8365) .. controls (13.7275, 3.8365) and (13.6825, 3.8171) .. (13.6472, 3.7782) .. controls (13.6119, 3.7377) and (13.5943, 3.6768) .. (13.5943, 3.5957) -- cycle(14.3087, 3.2808) -- (14.2002, 3.2808) -- (14.2002, 3.9105) -- (14.2981, 3.9105) -- (14.2981, 3.8153) .. controls (14.3228, 3.8612) and (14.3448, 3.8911) .. (14.3642, 3.9052) .. controls (14.3854, 3.9194) and (14.4083, 3.9264) .. (14.433, 3.9264) .. controls (14.4701, 3.9264) and (14.5071, 3.915) .. (14.5441, 3.892) -- (14.5071, 3.7915) .. controls (14.4806, 3.8074) and (14.4542, 3.8153) .. (14.4277, 3.8153) .. controls (14.4048, 3.8153) and (14.3845, 3.8082) .. (14.3669, 3.7941) .. controls (14.3475, 3.78) and (14.3334, 3.7606) .. (14.3245, 3.7359) .. controls (14.314, 3.6971) and (14.3087, 3.6557) .. (14.3087, 3.6116) -- cycle(8.3106, 2.1299) -- (8.4243, 2.1008) .. controls (8.4014, 2.0073) and (8.3582, 1.935) .. (8.2947, 1.8838) .. controls (8.2312, 1.8344) and (8.1545, 1.8098) .. (8.0645, 1.8098) .. controls (7.971, 1.8098) and (7.8943, 1.8292) .. (7.8343, 1.868) .. controls (7.7761, 1.9068) and (7.7311, 1.9623) .. (7.6994, 2.0346) .. controls (7.6694, 2.107) and (7.6544, 2.1846) .. (7.6544, 2.2675) .. controls (7.6544, 2.3574) and (7.672, 2.4368) .. (7.7073, 2.5056) .. controls (7.7408, 2.5726) and (7.7902, 2.6238) .. (7.8555, 2.6591) .. controls (7.919, 2.6943) and (7.9895, 2.712) .. (8.0671, 2.712) .. controls (8.1536, 2.712) and (8.2268, 2.6899) .. (8.2868, 2.6458) .. controls (8.345, 2.6) and (8.3864, 2.5374) .. (8.4111, 2.458) -- (8.2973, 2.4315) .. controls (8.2762, 2.495) and (8.2462, 2.5409) .. (8.2074, 2.5691) .. controls (8.1703, 2.5973) and (8.1227, 2.6114) .. (8.0645, 2.6114) .. controls (7.9975, 2.6114) and (7.941, 2.5956) .. (7.8952, 2.5638) .. controls (7.8511, 2.5321) and (7.8193, 2.4888) .. (7.7999, 2.4342) .. controls (7.7823, 2.3812) and (7.7735, 2.3257) .. (7.7735, 2.2675) .. controls (7.7735, 2.1934) and (7.784, 2.129) .. (7.8052, 2.0743) .. controls (7.8281, 2.0197) and (7.8617, 1.9782) .. (7.9058, 1.95) .. controls (7.9516, 1.9235) and (8.001, 1.9103) .. (8.0539, 1.9103) .. controls (8.1192, 1.9103) and (8.1739, 1.9288) .. (8.218, 1.9659) .. controls (8.2638, 2.0029) and (8.2947, 2.0576) .. (8.3106, 2.1299) -- cycle(8.6598, 2.5744) -- (8.554, 2.5744) -- (8.554, 2.6961) -- (8.6598, 2.6961) -- cycle(8.6598, 1.8256) -- (8.554, 1.8256) -- (8.554, 2.458) -- (8.6598, 2.458) -- cycle(9.0567, 1.9209) -- (9.0726, 1.8256) .. controls (9.0426, 1.8203) and (9.0152, 1.8177) .. (8.9905, 1.8177) .. controls (8.9517, 1.8177) and (8.9217, 1.8239) .. (8.9006, 1.8362) .. controls (8.8794, 1.8486) and (8.8644, 1.8644) .. (8.8556, 1.8838) .. controls (8.8468, 1.9032) and (8.8424, 1.9456) .. (8.8424, 2.0108) -- (8.8424, 2.3733) -- (8.7656, 2.3733) -- (8.7656, 2.4553) -- (8.8424, 2.4553) -- (8.8424, 2.6114) -- (8.9509, 2.6776) -- (8.9509, 2.4553) -- (9.0567, 2.4553) -- (9.0567, 2.3733) -- (8.9509, 2.3733) -- (8.9509, 2.0029) .. controls (8.9509, 1.9729) and (8.9526, 1.9535) .. (8.9561, 1.9447) .. controls (8.9597, 1.9359) and (8.9658, 1.9288) .. (8.9747, 1.9235) .. controls (8.9817, 1.9182) and (8.9932, 1.9156) .. (9.0091, 1.9156) .. controls (9.0214, 1.9156) and (9.0373, 1.9173) .. (9.0567, 1.9209) -- cycle(9.5726, 1.9024) .. controls (9.5338, 1.8688) and (9.4959, 1.845) .. (9.4589, 1.8309) .. controls (9.4218, 1.8168) and (9.383, 1.8098) .. (9.3424, 1.8098) .. controls (9.2719, 1.8098) and (9.2181, 1.8274) .. (9.181, 1.8627) .. controls (9.144, 1.8962) and (9.1255, 1.9394) .. (9.1255, 1.9923) .. controls (9.1255, 2.0223) and (9.1325, 2.0505) .. (9.1466, 2.077) .. controls (9.1608, 2.1017) and (9.1793, 2.122) .. (9.2022, 2.1378) .. controls (9.2251, 2.1537) and (9.2507, 2.1652) .. (9.2789, 2.1722) .. controls (9.3001, 2.1775) and (9.3319, 2.1828) .. (9.3742, 2.1881) .. controls (9.4606, 2.1987) and (9.5241, 2.211) .. (9.5647, 2.2251) .. controls (9.5647, 2.241) and (9.5647, 2.2507) .. (9.5647, 2.2542) .. controls (9.5647, 2.2983) and (9.555, 2.3292) .. (9.5356, 2.3469) .. controls (9.5074, 2.3698) and (9.4668, 2.3813) .. (9.4139, 2.3813) .. controls (9.3627, 2.3813) and (9.3257, 2.3724) .. (9.3027, 2.3548) .. controls (9.2781, 2.3372) and (9.2604, 2.3063) .. (9.2498, 2.2622) -- (9.144, 2.2754) .. controls (9.1528, 2.3213) and (9.1687, 2.3574) .. (9.1916, 2.3839) .. controls (9.2128, 2.4121) and (9.2437, 2.4333) .. (9.2842, 2.4474) .. controls (9.3266, 2.4633) and (9.3751, 2.4712) .. (9.4297, 2.4712) .. controls (9.4827, 2.4712) and (9.5259, 2.465) .. (9.5594, 2.4527) .. controls (9.5929, 2.4386) and (9.6176, 2.4218) .. (9.6335, 2.4024) .. controls (9.6494, 2.3848) and (9.6608, 2.361) .. (9.6679, 2.331) .. controls (9.6714, 2.3133) and (9.6732, 2.2807) .. (9.6732, 2.2331) -- (9.6732, 2.0902) .. controls (9.6732, 1.9897) and (9.6749, 1.9262) .. (9.6785, 1.8997) .. controls (9.6837, 1.875) and (9.6935, 1.8503) .. (9.7076, 1.8256) -- (9.5938, 1.8256) .. controls (9.5832, 1.8468) and (9.5762, 1.8724) .. (9.5726, 1.9024) -- cycle(9.5647, 2.1034) -- (9.5647, 2.1431) .. controls (9.5259, 2.1273) and (9.4677, 2.1131) .. (9.3901, 2.1008) .. controls (9.346, 2.0955) and (9.3151, 2.0884) .. (9.2975, 2.0796) .. controls (9.2781, 2.0726) and (9.2639, 2.0611) .. (9.2551, 2.0452) .. controls (9.2445, 2.0294) and (9.2392, 2.0126) .. (9.2392, 1.995) .. controls (9.2392, 1.9667) and (9.2498, 1.9429) .. (9.271, 1.9235) .. controls (9.2939, 1.9041) and (9.3257, 1.8944) .. (9.3662, 1.8944) .. controls (9.4086, 1.8944) and (9.4456, 1.9032) .. (9.4774, 1.9209) .. controls (9.5091, 1.9403) and (9.5321, 1.965) .. (9.5462, 1.995) .. controls (9.5585, 2.0197) and (9.5647, 2.0558) .. (9.5647, 2.1034) -- cycle(10.0727, 1.9209) -- (10.0886, 1.8256) .. controls (10.0586, 1.8203) and (10.0312, 1.8177) .. (10.0065, 1.8177) .. controls (9.9677, 1.8177) and (9.9377, 1.8239) .. (9.9166, 1.8362) .. controls (9.8954, 1.8486) and (9.8804, 1.8644) .. (9.8716, 1.8838) .. controls (9.8628, 1.9032) and (9.8584, 1.9456) .. (9.8584, 2.0108) -- (9.8584, 2.3733) -- (9.779, 2.3733) -- (9.779, 2.4553) -- (9.8584, 2.4553) -- (9.8584, 2.6114) -- (9.9642, 2.6776) -- (9.9642, 2.4553) -- (10.0727, 2.4553) -- (10.0727, 2.3733) -- (9.9642, 2.3733) -- (9.9642, 2.0029) .. controls (9.9642, 1.9729) and (9.966, 1.9535) .. (9.9695, 1.9447) .. controls (9.973, 1.9359) and (9.9792, 1.9288) .. (9.988, 1.9235) .. controls (9.9968, 1.9182) and (10.0092, 1.9156) .. (10.0251, 1.9156) .. controls (10.0374, 1.9156) and (10.0533, 1.9173) .. (10.0727, 1.9209) -- cycle(10.2844, 2.5744) -- (10.1785, 2.5744) -- (10.1785, 2.6961) -- (10.2844, 2.6961) -- cycle(10.2844, 1.8256) -- (10.1785, 1.8256) -- (10.1785, 2.458) -- (10.2844, 2.458) -- cycle(10.4087, 2.1405) .. controls (10.4087, 2.2569) and (10.4405, 2.3433) .. (10.504, 2.3998) .. controls (10.5586, 2.4474) and (10.6248, 2.4712) .. (10.7024, 2.4712) .. controls (10.7906, 2.4712) and (10.862, 2.4421) .. (10.9167, 2.3839) .. controls (10.9714, 2.3275) and (10.9987, 2.2498) .. (10.9987, 2.1511) .. controls (10.9987, 2.0682) and (10.9864, 2.0038) .. (10.9617, 1.9579) .. controls (10.937, 1.9121) and (10.9017, 1.8759) .. (10.8559, 1.8494) .. controls (10.81, 1.8247) and (10.7588, 1.8124) .. (10.7024, 1.8124) .. controls (10.6142, 1.8124) and (10.5428, 1.8406) .. (10.4881, 1.8971) .. controls (10.4352, 1.9535) and (10.4087, 2.0346) .. (10.4087, 2.1405) -- cycle(10.5172, 2.1405) .. controls (10.5172, 2.0593) and (10.5348, 1.9985) .. (10.5701, 1.9579) .. controls (10.6054, 1.9191) and (10.6495, 1.8997) .. (10.7024, 1.8997) .. controls (10.7553, 1.8997) and (10.7994, 1.92) .. (10.8347, 1.9606) .. controls (10.87, 2.0011) and (10.8876, 2.0629) .. (10.8876, 2.1458) .. controls (10.8876, 2.2234) and (10.87, 2.2816) .. (10.8347, 2.3204) .. controls (10.7994, 2.361) and (10.7553, 2.3813) .. (10.7024, 2.3813) .. controls (10.6495, 2.3813) and (10.6054, 2.3618) .. (10.5701, 2.323) .. controls (10.5348, 2.2825) and (10.5172, 2.2216) .. (10.5172, 2.1405) -- cycle(11.2316, 1.8256) -- (11.1231, 1.8256) -- (11.1231, 2.4553) -- (11.221, 2.4553) -- (11.221, 2.368) .. controls (11.2668, 2.4368) and (11.3339, 2.4712) .. (11.4221, 2.4712) .. controls (11.4591, 2.4712) and (11.4935, 2.4642) .. (11.5252, 2.45) .. controls (11.557, 2.4359) and (11.5808, 2.4183) .. (11.5967, 2.3971) .. controls (11.6126, 2.3742) and (11.624, 2.3477) .. (11.6311, 2.3178) .. controls (11.6346, 2.2983) and (11.6364, 2.264) .. (11.6364, 2.2146) -- (11.6364, 1.8256) -- (11.5305, 1.8256) -- (11.5305, 2.2093) .. controls (11.5305, 2.2534) and (11.5261, 2.286) .. (11.5173, 2.3072) .. controls (11.5085, 2.3283) and (11.4935, 2.3451) .. (11.4723, 2.3574) .. controls (11.4512, 2.3715) and (11.4265, 2.3786) .. (11.3982, 2.3786) .. controls (11.3524, 2.3786) and (11.3127, 2.3636) .. (11.2792, 2.3336) .. controls (11.2474, 2.3054) and (11.2316, 2.2507) .. (11.2316, 2.1696) -- cycle(12.6365, 1.9288) .. controls (12.6012, 1.89) and (12.5633, 1.8609) .. (12.5227, 1.8415) .. controls (12.4804, 1.8221) and (12.4354, 1.8124) .. (12.3878, 1.8124) .. controls (12.2978, 1.8124) and (12.2264, 1.8424) .. (12.1735, 1.9024) .. controls (12.1311, 1.9517) and (12.11, 2.0064) .. (12.11, 2.0664) .. controls (12.11, 2.1193) and (12.1276, 2.1678) .. (12.1629, 2.2119) .. controls (12.1982, 2.256) and (12.2502, 2.2939) .. (12.319, 2.3257) .. controls (12.2802, 2.3715) and (12.2537, 2.4086) .. (12.2396, 2.4368) .. controls (12.2273, 2.465) and (12.2211, 2.4924) .. (12.2211, 2.5188) .. controls (12.2211, 2.57) and (12.2414, 2.615) .. (12.282, 2.6538) .. controls (12.3225, 2.6926) and (12.3746, 2.712) .. (12.4381, 2.712) .. controls (12.4963, 2.712) and (12.5448, 2.6935) .. (12.5836, 2.6564) .. controls (12.6206, 2.6211) and (12.6391, 2.5779) .. (12.6391, 2.5268) .. controls (12.6391, 2.4439) and (12.5845, 2.3733) .. (12.4751, 2.3151) -- (12.6312, 2.114) .. controls (12.6488, 2.1493) and (12.663, 2.1899) .. (12.6735, 2.2357) -- (12.7847, 2.2119) .. controls (12.7653, 2.1361) and (12.7397, 2.0735) .. (12.7079, 2.0241) .. controls (12.7467, 1.9711) and (12.7917, 1.927) .. (12.8429, 1.8918) -- (12.7714, 1.8071) .. controls (12.7273, 1.8336) and (12.6824, 1.8741) .. (12.6365, 1.9288) -- cycle(12.3719, 2.4395) -- (12.4195, 2.3839) .. controls (12.4654, 2.4104) and (12.4954, 2.4342) .. (12.5095, 2.4553) .. controls (12.5236, 2.4747) and (12.5307, 2.4977) .. (12.5307, 2.5241) .. controls (12.5307, 2.5523) and (12.521, 2.5762) .. (12.5016, 2.5956) .. controls (12.4822, 2.615) and (12.4592, 2.6247) .. (12.4328, 2.6247) .. controls (12.4028, 2.6247) and (12.3781, 2.615) .. (12.3587, 2.5956) .. controls (12.3393, 2.5779) and (12.3296, 2.555) .. (12.3296, 2.5268) .. controls (12.3296, 2.5144) and (12.3331, 2.5003) .. (12.3402, 2.4844) .. controls (12.3472, 2.4703) and (12.3578, 2.4553) .. (12.3719, 2.4395) -- cycle(12.5704, 2.0135) -- (12.3746, 2.2569) .. controls (12.3164, 2.2216) and (12.2767, 2.189) .. (12.2555, 2.159) .. controls (12.2361, 2.1308) and (12.2264, 2.1017) .. (12.2264, 2.0717) .. controls (12.2264, 2.0364) and (12.2405, 2.0003) .. (12.2687, 1.9632) .. controls (12.297, 1.9244) and (12.3366, 1.905) .. (12.3878, 1.905) .. controls (12.4195, 1.905) and (12.4531, 1.9156) .. (12.4883, 1.9367) .. controls (12.5218, 1.9562) and (12.5492, 1.9817) .. (12.5704, 2.0135) -- cycle(13.6313, 1.8256) -- (13.298, 1.8256) -- (13.298, 2.6961) -- (13.626, 2.6961) .. controls (13.6913, 2.6961) and (13.7442, 2.6873) .. (13.7848, 2.6696) .. controls (13.8254, 2.652) and (13.8571, 2.6255) .. (13.88, 2.5903) .. controls (13.903, 2.5532) and (13.9144, 2.5144) .. (13.9144, 2.4739) .. controls (13.9144, 2.4368) and (13.9039, 2.4015) .. (13.8827, 2.368) .. controls (13.8633, 2.3363) and (13.8333, 2.3098) .. (13.7927, 2.2886) .. controls (13.8456, 2.2745) and (13.8853, 2.2481) .. (13.9118, 2.2093) .. controls (13.9418, 2.1722) and (13.9568, 2.129) .. (13.9568, 2.0796) .. controls (13.9568, 2.0373) and (13.948, 1.9994) .. (13.9303, 1.9659) .. controls (13.9127, 1.9306) and (13.8915, 1.9032) .. (13.8668, 1.8838) .. controls (13.8404, 1.8644) and (13.8086, 1.8503) .. (13.7716, 1.8415) .. controls (13.7328, 1.8309) and (13.686, 1.8256) .. (13.6313, 1.8256) -- cycle(13.4144, 2.5956) -- (13.4144, 2.331) -- (13.6022, 2.331) .. controls (13.6534, 2.331) and (13.6895, 2.3345) .. (13.7107, 2.3416) .. controls (13.7407, 2.3504) and (13.7627, 2.3645) .. (13.7769, 2.3839) .. controls (13.7927, 2.4051) and (13.8007, 2.4306) .. (13.8007, 2.4606) .. controls (13.8007, 2.4888) and (13.7936, 2.5144) .. (13.7795, 2.5374) .. controls (13.7654, 2.5585) and (13.7451, 2.5735) .. (13.7186, 2.5823) .. controls (13.694, 2.5912) and (13.6499, 2.5956) .. (13.5864, 2.5956) -- cycle(13.4144, 2.2278) -- (13.4144, 1.9288) -- (13.6313, 1.9288) .. controls (13.6684, 1.9288) and (13.6948, 1.9306) .. (13.7107, 1.9341) .. controls (13.7372, 1.9376) and (13.7592, 1.9456) .. (13.7769, 1.9579) .. controls (13.7945, 1.9685) and (13.8095, 1.9844) .. (13.8218, 2.0055) .. controls (13.8324, 2.0267) and (13.8377, 2.0514) .. (13.8377, 2.0796) .. controls (13.8377, 2.1114) and (13.8298, 2.1396) .. (13.8139, 2.1643) .. controls (13.7963, 2.1872) and (13.7733, 2.204) .. (13.7451, 2.2146) .. controls (13.7151, 2.2234) and (13.6728, 2.2278) .. (13.6181, 2.2278) -- cycle(14.2081, 2.5744) -- (14.1023, 2.5744) -- (14.1023, 2.6961) -- (14.2081, 2.6961) -- cycle(14.2081, 1.8283) -- (14.1023, 1.8283) -- (14.1023, 2.458) -- (14.2081, 2.458) -- cycle(14.4701, 1.9076) -- (14.4701, 1.8283) -- (14.3695, 1.8283) -- (14.3695, 2.6987) -- (14.478, 2.6987) -- (14.478, 2.3892) .. controls (14.5221, 2.4456) and (14.5794, 2.4739) .. (14.65, 2.4739) .. controls (14.6888, 2.4739) and (14.7258, 2.4659) .. (14.7611, 2.45) .. controls (14.7946, 2.4342) and (14.8228, 2.4121) .. (14.8458, 2.3839) .. controls (14.8687, 2.3557) and (14.8863, 2.3222) .. (14.8987, 2.2834) .. controls (14.911, 2.2428) and (14.9172, 2.1996) .. (14.9172, 2.1537) .. controls (14.9172, 2.0461) and (14.8908, 1.9623) .. (14.8378, 1.9024) .. controls (14.7849, 1.8441) and (14.7205, 1.815) .. (14.6447, 1.815) .. controls (14.5706, 1.815) and (14.5124, 1.8459) .. (14.4701, 1.9076) -- cycle(14.4674, 2.1484) .. controls (14.4674, 2.0726) and (14.478, 2.0179) .. (14.4992, 1.9844) .. controls (14.5327, 1.9297) and (14.5785, 1.9024) .. (14.6368, 1.9024) .. controls (14.6826, 1.9024) and (14.7232, 1.9226) .. (14.7585, 1.9632) .. controls (14.792, 2.0038) and (14.8087, 2.0646) .. (14.8087, 2.1458) .. controls (14.8087, 2.2269) and (14.792, 2.2878) .. (14.7585, 2.3283) .. controls (14.7267, 2.3671) and (14.6879, 2.3865) .. (14.642, 2.3865) .. controls (14.5944, 2.3865) and (14.5538, 2.3663) .. (14.5203, 2.3257) .. controls (14.4851, 2.2851) and (14.4674, 2.226) .. (14.4674, 2.1484) -- cycle(15.3988, 1.8283) -- (15.2823, 1.8283) -- (15.2823, 2.5982) -- (14.9966, 2.5982) -- (14.9966, 2.6987) -- (15.6871, 2.6987) -- (15.6871, 2.5982) -- (15.3988, 2.5982) -- cycle(16.0893, 2.0294) -- (16.1978, 2.0161) .. controls (16.1819, 1.9526) and (16.1502, 1.9024) .. (16.1025, 1.8653) .. controls (16.0549, 1.83) and (15.9949, 1.8124) .. (15.9226, 1.8124) .. controls (15.8291, 1.8124) and (15.7551, 1.8406) .. (15.7004, 1.8971) .. controls (15.6475, 1.9553) and (15.621, 2.0355) .. (15.621, 2.1378) .. controls (15.621, 2.2437) and (15.6483, 2.3257) .. (15.703, 2.3839) .. controls (15.7577, 2.4439) and (15.8283, 2.4739) .. (15.9147, 2.4739) .. controls (15.9994, 2.4739) and (16.069, 2.4447) .. (16.1237, 2.3865) .. controls (16.1766, 2.3283) and (16.2031, 2.2472) .. (16.2031, 2.1431) .. controls (16.2031, 2.1378) and (16.2031, 2.129) .. (16.2031, 2.1167) -- (15.7321, 2.1167) .. controls (15.7357, 2.0461) and (15.7551, 1.9923) .. (15.7903, 1.9553) .. controls (15.8256, 1.9182) and (15.8697, 1.8997) .. (15.9226, 1.8997) .. controls (15.9614, 1.8997) and (15.9949, 1.9103) .. (16.0232, 1.9315) .. controls (16.0514, 1.9526) and (16.0734, 1.9853) .. (16.0893, 2.0294) -- cycle(15.7374, 2.204) -- (16.0893, 2.204) .. controls (16.084, 2.2569) and (16.0708, 2.2966) .. (16.0496, 2.323) .. controls (16.0161, 2.3636) and (15.972, 2.3839) .. (15.9173, 2.3839) .. controls (15.8679, 2.3839) and (15.8265, 2.368) .. (15.793, 2.3363) .. controls (15.7595, 2.3028) and (15.7409, 2.2587) .. (15.7374, 2.204) -- cycle(16.3962, 1.8283) -- (16.2586, 1.8283) -- (16.5947, 2.2807) -- (16.2983, 2.6987) -- (16.4359, 2.6987) -- (16.5947, 2.4739) .. controls (16.6264, 2.428) and (16.6493, 2.3927) .. (16.6635, 2.368) .. controls (16.6829, 2.3998) and (16.7058, 2.4333) .. (16.7323, 2.4686) -- (16.9069, 2.6987) -- (17.0339, 2.6987) -- (16.727, 2.2886) -- (17.0577, 1.8283) -- (16.9148, 1.8283) -- (16.6952, 2.1378) .. controls (16.6829, 2.1555) and (16.6705, 2.1749) .. (16.6582, 2.196) .. controls (16.6388, 2.1643) and (16.6247, 2.1422) .. (16.6158, 2.1299) -- cycle;\n" +
    "\n" +
    "\n" +
    "\n" +
    "  \\path[fill=c3777b7] (3.6698, 2.5956).. controls (3.8391, 2.7702) and (4.0666, 2.9792) .. (4.0481, 3.2015).. controls (4.0243, 3.4581) and (3.8814, 3.6751) .. (3.6777, 3.6777).. controls (3.5057, 3.6804) and (3.3046, 3.5137) .. (3.3073, 3.3338).. controls (3.3099, 3.2385) and (3.347, 3.0824) .. (3.429, 3.0295).. controls (3.4793, 2.9977) and (3.5719, 3.0242) .. (3.5825, 2.9607).. controls (3.593, 2.9184) and (3.5719, 2.8416) .. (3.5057, 2.757).. controls (3.3999, 2.622) and (3.2411, 2.5215) .. (3.2544, 2.4791).. controls (3.2835, 2.3892) and (3.5586, 2.4818) .. (3.6698, 2.5956) -- cycle;\n" +
    "\n" +
    "\n" +
    "\n" +
    "  \\path[fill=c3777b7] (4.5958, 2.5691).. controls (4.7651, 2.7437) and (4.9953, 2.9527) .. (4.9742, 3.175).. controls (4.9504, 3.4316) and (4.8075, 3.6486) .. (4.6038, 3.6513).. controls (4.4318, 3.6539) and (4.2307, 3.4872) .. (4.2333, 3.3073).. controls (4.236, 3.212) and (4.273, 3.0559) .. (4.355, 3.003).. controls (4.4053, 2.9713) and (4.4979, 2.9977) .. (4.5085, 2.9342).. controls (4.5191, 2.8919) and (4.4979, 2.8152) .. (4.4318, 2.7305).. controls (4.3259, 2.5956) and (4.1672, 2.495) .. (4.1804, 2.4527).. controls (4.2095, 2.3627) and (4.4847, 2.4553) .. (4.5958, 2.5691) -- cycle;\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\\end{tikzpicture}\n" +
    "}\n" +
    "% Define the command to create a hyperlink to the annotations page\n" +
    "\\newcommand{\\AddAnnotationRef}{\n" +
    "  \\begin{tikzpicture}[remember picture,overlay]\n" +
    "    \\node[anchor=north east, inner sep=10pt] at (current page.north east) {\n" +
    "      \\hyperlink{annotation}{\n" +
    "        \\AnnotationImage\n" +
    "      }\n" +
    "    };\n" +
    "  \\end{tikzpicture}\n" +
    "}\n" +
    "\n" +
    "\n" +
    "\n" +
    "\\tcbuselibrary{listings, skins} % Use the listings and skins libraries from tcolorbox\n" +
    "\n" +
    "% Define the online version link command\n" +
    "\\newcommand{\\onlineversion}[1]{\n" +
    "    \\noindent \\href{#1}{Click here for the Online Version} \\par\n" +
    "}\n" +
    "\n" +
    "% Define the larger and centered title command\n" +
    "\\newcommand{\\citationtitle}{\n" +
    "    \\begin{center}\n" +
    "        \\LARGE \\bfseries Citation for this Paper\n" +
    "    \\end{center}\n" +
    "    \\vspace{1em} % Provide some space after the title\n" +
    "}\n" +
    "\n" +
    "% Define the BibTeX Annotation environment using tcolorbox\n" +
    "\\newtcblisting{bibtexannotation}{\n" +
    "    arc=3mm, % Adjust corner radius here\n" +
    "    top=0mm,\n" +
    "    bottom=0mm,\n" +
    "    left=5mm,\n" +
    "    right=5mm,\n" +
    "    boxrule=0.5pt,\n" +
    "    colback=white, % Background color of the box\n" +
    "    colframe=black, % Frame color\n" +
    "    listing only,\n" +
    "    listing options={\n" +
    "        basicstyle=\\ttfamily\\footnotesize,\n" +
    "        breaklines=true,\n" +
    "        breakindent=0pt,\n" +
    "        breakautoindent=false,\n" +
    "        frame=single,\n" +
    "        framesep=10pt,\n" +
    "        framerule=0pt,\n" +
    "        xleftmargin=10pt,\n" +
    "        xrightmargin=10pt,\n" +
    "        aboveskip=20pt,\n" +
    "        belowskip=20pt\n" +
    "    },\n" +
    "    before skip=10pt,\n" +
    "    after skip=10pt\n" +
    "}\n" +
    "\n" +
    "% Define the related papers environment\n" +
    "\\newenvironment{relatedpapers}{\n" +
    "    \\section*{Related Papers}\n" +
    "    \\begin{enumerate}\n" +
    "}{\n" +
    "    \\end{enumerate}\n" +
    "}\n" +
    "\n" +
    "% Define the related paper item\n" +
    "\\newcommand{\\relatedpaper}[1]{\n" +
    "    \\item #1\n" +
    "}\n" +
    "\n" +
    "\\endinput\n"
