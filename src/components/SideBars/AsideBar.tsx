"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ChevronsLeft, ChevronsRight, Plus } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { useLocalStorage } from 'usehooks-ts';
import { OrganizationTypes } from '@/lib/types/OrganizationTypes';
import NavItem from './NavItem';
import { Skeleton } from '@/components/ui/skeleton';
interface AsideBarProps {
  navLinksData:
  {
    id: number;
    title: string;
    href: string;
  }[]

}
const AsideBar = ({
  navLinksData
}: AsideBarProps) => {
  const isMobile = useMediaQuery("(max-width: 720px)")
  const pathname = usePathname();
  //States
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isResetting, setIsResetting] = useState(false);

  // for organization purposes
  const storageKey = "t-sidebar-org"
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const {
    organization: activeOrganization,
    isLoaded: isLoadedOrg
  } = useOrganization();
  // console.log(activeOrganization)
  const {
    userMemberships,
    isLoaded: isLoadedOrgList
  } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    }, []);

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };



  // sidebar functionality
  // Refs
  const asideRef = useRef<ElementRef<"aside">>(null);
  const isResizingRef = useRef(false);
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile])
  // functions 
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef) return;
    let newWidth = e.clientX
    if (newWidth < 100) newWidth = 100;
    if (newWidth > 800) newWidth = 800;

    if (asideRef.current) {
      asideRef.current.style.width = `${newWidth}px`
    }

  }
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }
  const resetWidth = () => {
    if (asideRef.current) {
      setIsResetting(true)
      asideRef.current.style.width = "14rem"
      setIsCollapsed(false)
      setTimeout(() => setIsResetting(false), 300)
    }
  }
  const collapse = () => {
    if (asideRef.current) {
      console.log(asideRef.current)
      setIsResetting(true)
      asideRef.current.style.width = "0"
      setIsCollapsed(true)
      setTimeout(() => setIsResetting(false), 300)
    }
  }
  return (
    <>
      <aside
        ref={asideRef}
        className={cn(
          "absolute z-[9999] md:relative md:z-0 group/aside h-full max-h-screen w-[14rem] bg-card rounded-sm",
          isResetting && "transition-all ease-in-out duration-300"

        )}
      >
       
        {/* Aside Controls  */}
        <span
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className='opacity-0 group-hover/aside:opacity-60 h-full w-2 bg-secondary absolute top-0 right-0 transition-all duration-1 cursor-ew-resize'
        />
        <span
          role={"button"}
          onClick={collapse}
          className='absolute top-1 right-4 h-7 w-7 flex items-center justify-center hover:cursor-pointer'
        >
          <ChevronsLeft className='h-4 w-4' />
        </span>

        {
          !isCollapsed && (
            <div className='flex flex-col w-full mt-10 p-[2px] rounded-sm gap-2 transition-all duration-300'>
              <div className='flex flex-col gap-2 text-sm'>
                {
                  navLinksData?.map((navLink) => {
                    const isActive = (pathname.includes(navLink.href) && navLink.href.length > 1) || pathname === navLink.href
                    return (
                      <Link
                        key={navLink.id}
                        href={navLink.href}
                        className={cn(
                          "py-3 px-4 font-semibold rounded-md",
                          isActive && "bg-secondary text-md"
                        )}
                      >
                        {navLink.title}
                      </Link> 
                    )
                  })
                }
              </div>
              <Separator />
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <section className="font-medium text-xs flex justify-between w-full items-center mb-1 px-4">
                      <span className='font-semibold text-md'>My Groups</span>
                      <Button
                        asChild
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="ml-auto"
                      >
                        <Link href="/select-org">
                          <Plus
                            className="h-4 w-4"
                          />
                        </Link>
                      </Button>
                    </section>
                  </AccordionTrigger>
                  <AccordionContent>
                    {
                      !isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading
                        ? (
                          <>
                            <section className="flex items-center justify-between mb-2">
                              <Skeleton className="h-10 w-[50%]" />
                              <Skeleton className="h-10 w-10" />
                            </section>
                            <section className="space-y-2">
                              <NavItem.Skeleton />
                              <NavItem.Skeleton />
                              <NavItem.Skeleton />
                            </section>
                          </>
                        ) : (
                          <Accordion
                            type="multiple"
                            defaultValue={defaultAccordionValue}
                            className="space-y-2"
                          >
                            {userMemberships.data.map(({ organization }) => (
                              <NavItem
                                key={organization.id}
                                isActive={activeOrganization?.id === organization.id}
                                isExpanded={expanded[organization.id]}
                                organization={organization as OrganizationTypes}
                                onExpand={onExpand}
                              />
                            ))}
                          </Accordion>
                        )
                    }
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )
        }
      </aside>
      {
        !isResetting && isCollapsed && (
          <div
            role={"button"}
            onClick={resetWidth}
            className='absolute z-[9999] top-[70px] md:top-[50px] flex p-1 h-[30px] md:h-full md:w-[50px] w-[23px] items-start md:justify-center hover:cursor-pointer'
          >
            <ChevronsRight className='h-5 w-5' />
          </div>
        )
      }
    </>
  )
}

export default AsideBar