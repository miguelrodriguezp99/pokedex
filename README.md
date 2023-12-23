Extension para crear la template del componente ES7
Ahora dentro del componente ponemos "rafc" y nos crea la template del componente

----- RESPONSIVE ASSIDE (ocultar en mobile) -----

En talwind hay un @media para responsive en 1024px
@media (min-width: 1024px) {
.container {
max-width: 1024px;
}
}

en taiwind sería "hidden lg:block"
return <div className="hidden lg:block">Aside</div>;
Es decir, estará hidden hasta que lg (1024px @media hace que se muestre en bloque)

---
