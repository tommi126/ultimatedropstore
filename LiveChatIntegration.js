export function liveChatSnippet(tawkId){ 
  const id = tawkId || process.env.NEXT_PUBLIC_TAWK_ID || 'TAWK_ID';
  return `
<!-- Tawk.to Live Chat -->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true; s1.src='https://embed.tawk.to/${id}/default';
s1.charset='UTF-8'; s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0); })();
</script>`;
}
